import * as Nearby from "expo-nearby-connections";
import { Strategy } from "expo-nearby-connections";

const ENABLE_MESH_LOGS = true;
const TAG = "[MeshSync:v4]";
const CHUNK_SIZE = 16 * 1024;

function log(...args: any[]) {
  if (!ENABLE_MESH_LOGS) return;
  console.log(TAG, new Date().toISOString(), ...args);
}

type EntityAdapter = {
  name: string;
  getIds: () => string[];
  getById: (id: string) => Promise<any>;
  insertMeta: (data: any) => void;
  updateBinary?: (id: string, base64: string) => Promise<void>;
};

type MeshConfig = {
  deviceId: string;
  serviceId: string;
  entities: EntityAdapter[];
};

export function createMeshSync(config: MeshConfig) {
  const { deviceId, serviceId, entities } = config;

  let started = false;
  let discovering = false;
  let unsubscribers: any[] = [];

  const connecting = new Set<string>();
  const syncing = new Set<string>();
  const incomingChunks = new Map<string, string[]>();

  const entityMap = new Map(entities.map((e) => [e.name, e]));

  function start() {
    if (started) return;
    started = true;

    log("Starting MeshSync v4 for", deviceId);

    Nearby.startAdvertise(`${serviceId}::${deviceId}`, Strategy.P2P_CLUSTER)
      .then(() => log("Advertise started"))
      .catch((e) => log("Advertise error", e));

    startDiscovery();

    unsubscribers.push(
      Nearby.onPeerFound((peer) => {
        log("Peer found:", peer.peerId);

        if (connecting.has(peer.peerId) || syncing.has(peer.peerId)) {
          return;
        }

        const theirDeviceId = peer.name?.split("::")?.[1] ?? peer.peerId;

        if (deviceId > theirDeviceId) {
          return;
        }

        connecting.add(peer.peerId);

        if (discovering) {
          Nearby.stopDiscovery().catch(() => {});
          discovering = false;
        }

        Nearby.requestConnection(peer.peerId).catch(() => {
          connecting.delete(peer.peerId);
        });
      }),

      Nearby.onInvitationReceived(({ peerId }) => {
        connecting.add(peerId);
        Nearby.acceptConnection(peerId).catch(() => {
          connecting.delete(peerId);
        });
      }),

      Nearby.onConnected(({ peerId }) => {
        log("Connected to", peerId);
        sendHandshake(peerId);
      }),

      Nearby.onDisconnected(({ peerId }) => {
        log("Disconnected from", peerId);
        connecting.delete(peerId);
        syncing.delete(peerId);
        startDiscovery();
      }),

      Nearby.onTextReceived(({ peerId, text }) => {
        handleMessage(peerId, text);
      }),
    );
  }

  function stop() {
    if (!started) return;
    started = false;

    Nearby.stopAdvertise().catch(() => {});
    Nearby.stopDiscovery().catch(() => {});

    unsubscribers.forEach((u) => {
      if (typeof u === "function") u();
      else if (u && typeof u.remove === "function") u.remove();
    });

    unsubscribers = [];
    connecting.clear();
    syncing.clear();
    incomingChunks.clear();
  }

  function startDiscovery() {
    if (!started || discovering) return;

    discovering = true;

    Nearby.startDiscovery(`${serviceId}::`, Strategy.P2P_CLUSTER)
      .then(() => log("Discovery started"))
      .catch(() => {
        discovering = false;
      });
  }

  function sendHandshake(peerId: string) {
    const state: Record<string, string[]> = {};

    for (const entity of entities) {
      state[entity.name] = entity.getIds();
    }

    Nearby.sendText(
      peerId,
      JSON.stringify({
        type: "HANDSHAKE",
        deviceId,
        entities: state,
      }),
    ).catch(() => {});
  }

  async function handleMessage(peerId: string, raw: string) {
    let msg: any;

    try {
      msg = JSON.parse(raw);
    } catch {
      return;
    }

    if (msg.type === "HANDSHAKE") {
      const requests: { entity: string; ids: string[] }[] = [];

      for (const [entityName, theirIds] of Object.entries(msg.entities || {})) {
        const entity = entityMap.get(entityName);
        if (!entity) continue;

        const myIds = entity.getIds();
        const missing = (theirIds as string[]).filter(
          (id) => !myIds.includes(id),
        );

        if (missing.length > 0) {
          requests.push({ entity: entityName, ids: missing });
        }
      }

      if (requests.length > 0) {
        syncing.add(peerId);

        Nearby.sendText(
          peerId,
          JSON.stringify({
            type: "REQUEST",
            requests,
          }),
        ).catch(() => {});
      } else {
        Nearby.sendText(
          peerId,
          JSON.stringify({ type: "NOTHING_TO_REQUEST" }),
        ).catch(() => {});
      }
    }

    if (msg.type === "REQUEST") {
      for (const req of msg.requests) {
        const entity = entityMap.get(req.entity);
        if (!entity) continue;

        for (const id of req.ids) {
          const data = await entity.getById(id);

          // Send metadata first
          await Nearby.sendText(
            peerId,
            JSON.stringify({
              type: "ENTITY_META",
              entity: req.entity,
              data,
            }),
          ).catch(() => {});

          if (entity.updateBinary && data?.imageUri) {
            const base64 = await readAsBase64(data.imageUri);
            const total = Math.ceil(base64.length / CHUNK_SIZE);

            for (let i = 0; i < total; i++) {
              await Nearby.sendText(
                peerId,
                JSON.stringify({
                  type: "ENTITY_CHUNK",
                  entity: req.entity,
                  id,
                  index: i,
                  total,
                  chunk: base64.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE),
                }),
              ).catch(() => {});
            }
          }
        }
      }

      Nearby.sendText(
        peerId,
        JSON.stringify({ type: "FINISHED_SENDING" }),
      ).catch(() => {});
    }

    if (msg.type === "ENTITY_META") {
      entityMap.get(msg.entity)?.insertMeta(msg.data);
    }

    if (msg.type === "ENTITY_CHUNK") {
      const key = `${msg.entity}_${msg.id}`;

      if (!incomingChunks.has(key)) {
        incomingChunks.set(key, new Array(msg.total).fill(""));
      }

      const chunks = incomingChunks.get(key)!;
      chunks[msg.index] = msg.chunk;

      if (chunks.every(Boolean)) {
        log("Reconstructed binary", key);

        entityMap
          .get(msg.entity)
          ?.updateBinary?.(msg.id, chunks.join(""))
          .catch(() => {});

        incomingChunks.delete(key);
      }
    }

    if (msg.type === "NOTHING_TO_REQUEST") {
      syncing.delete(peerId);
    }

    if (msg.type === "FINISHED_SENDING") {
      syncing.delete(peerId);
    }
  }

  async function readAsBase64(uri: string) {
    const fs = require("expo-file-system/legacy");
    return await fs.readAsStringAsync(uri, {
      encoding: fs.EncodingType.Base64,
    });
  }

  return { start, stop };
}
