import * as Nearby from "expo-nearby-connections";
import { Strategy } from "expo-nearby-connections";

const ENABLE_MESH_LOGS = true;
const TAG = "[MeshSync]";
const CHUNK_SIZE = 16 * 1024;

function log(...args: any[]) {
  if (!ENABLE_MESH_LOGS) return;
  console.log(TAG, new Date().toISOString(), ...args);
}

function warn(...args: any[]) {
  if (!ENABLE_MESH_LOGS) return;
  console.warn(TAG, new Date().toISOString(), ...args);
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
  let intervalId: any = null;
  let discoveryTimeoutId: any = null;
  let unsubscribers: any[] = [];

  const connecting = new Set<string>();
  const syncing = new Set<string>();
  const connectionCooldowns = new Set<string>();

  const fallbackTimeouts = new Map<string, ReturnType<typeof setTimeout>>();
  const disconnectTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

  const peerState = new Map<
    string,
    { iAmDoneReceiving: boolean; theyAreDoneReceiving: boolean }
  >();

  const incomingChunks = new Map<string, string[]>();
  const entityMap = new Map(entities.map((e) => [e.name, e]));

  async function attemptConnection(peerId: string, isFallback = false) {
    const label = isFallback ? "FALLBACK" : "NORMAL";

    await Nearby.disconnect(peerId).catch(() => {});
    await new Promise((r) => setTimeout(r, 500));

    try {
      log(label, "Attempt 1 to connect", peerId);
      await Nearby.requestConnection(peerId);
    } catch {
      log(label, "Retrying connection", peerId);
      await new Promise((r) => setTimeout(r, 1000));

      try {
        await Nearby.requestConnection(peerId);
      } catch {
        log(label, "Connection failed after retry", peerId);
        connecting.delete(peerId);
        connectionCooldowns.add(peerId);
        setTimeout(() => connectionCooldowns.delete(peerId), 10000);
        setTimeout(() => startDiscovery(), 2000);
      }
    }
  }

  function markIAmDoneReceiving(peerId: string) {
    const s = peerState.get(peerId) || {
      iAmDoneReceiving: false,
      theyAreDoneReceiving: false,
    };
    s.iAmDoneReceiving = true;
    peerState.set(peerId, s);
    checkDisconnect(peerId);
  }

  function markTheyAreDoneReceiving(peerId: string) {
    const s = peerState.get(peerId) || {
      iAmDoneReceiving: false,
      theyAreDoneReceiving: false,
    };
    s.theyAreDoneReceiving = true;
    peerState.set(peerId, s);
    checkDisconnect(peerId);
  }

  function checkDisconnect(peerId: string) {
    const s = peerState.get(peerId);
    if (!s) return;

    if (s.iAmDoneReceiving && s.theyAreDoneReceiving) {
      if (disconnectTimeouts.has(peerId)) return;

      log("Both sides done. Scheduling disconnect", peerId);

      const t = setTimeout(() => {
        cleanupPeer(peerId);
        Nearby.disconnect(peerId).catch((e) => warn("Disconnect error", e));
      }, 1000);

      disconnectTimeouts.set(peerId, t);
    }
  }

  function cleanupPeer(peerId: string) {
    connecting.delete(peerId);
    syncing.delete(peerId);
    peerState.delete(peerId);

    if (disconnectTimeouts.has(peerId)) {
      clearTimeout(disconnectTimeouts.get(peerId)!);
      disconnectTimeouts.delete(peerId);
    }

    if (fallbackTimeouts.has(peerId)) {
      clearTimeout(fallbackTimeouts.get(peerId)!);
      fallbackTimeouts.delete(peerId);
    }
  }

  function start() {
    if (started) return;
    started = true;

    log("Starting MeshSync v5 for", deviceId);

    unsubscribers.push(
      Nearby.onPeerFound((peer) => {
        if (
          connecting.has(peer.peerId) ||
          syncing.has(peer.peerId) ||
          connectionCooldowns.has(peer.peerId)
        ) {
          return;
        }

        const theirDeviceId = peer.name?.split("::")?.[1] ?? peer.peerId;

        if (deviceId > theirDeviceId) {
          const t = setTimeout(() => {
            if (!connecting.has(peer.peerId)) {
              connecting.add(peer.peerId);
              attemptConnection(peer.peerId, true);
            }
          }, 3000);

          fallbackTimeouts.set(peer.peerId, t);
          return;
        }

        connecting.add(peer.peerId);
        attemptConnection(peer.peerId, false);
      }),

      Nearby.onInvitationReceived(({ peerId }) => {
        connecting.add(peerId);
        Nearby.acceptConnection(peerId).catch(() => {
          connecting.delete(peerId);
        });
      }),

      Nearby.onConnected(({ peerId }) => {
        peerState.set(peerId, {
          iAmDoneReceiving: false,
          theyAreDoneReceiving: false,
        });
        sendHandshake(peerId);
      }),

      Nearby.onDisconnected(({ peerId }) => {
        cleanupPeer(peerId);
        connectionCooldowns.add(peerId);
        setTimeout(() => connectionCooldowns.delete(peerId), 5000);
        setTimeout(() => startDiscovery(), 1000);
      }),

      Nearby.onTextReceived(({ peerId, text }) => handleMessage(peerId, text)),
    );

    Nearby.startAdvertise(
      `${serviceId}::${deviceId}`,
      Strategy.P2P_CLUSTER,
    ).catch(() => {});

    startDiscovery();

    intervalId = setInterval(() => {
      if (!discovering && connecting.size === 0 && syncing.size === 0) {
        startDiscovery();
      }
    }, 10000);
  }

  function stop() {
    if (!started) return;
    started = false;

    if (intervalId) clearInterval(intervalId);
    if (discoveryTimeoutId) clearTimeout(discoveryTimeoutId);

    connecting.forEach((p) => Nearby.disconnect(p).catch(() => {}));

    Nearby.stopAdvertise().catch(() => {});
    Nearby.stopDiscovery().catch(() => {});

    unsubscribers.forEach((u) => {
      if (typeof u === "function") u();
      else if (u?.remove) u.remove();
    });

    unsubscribers = [];
    connecting.clear();
    syncing.clear();
    incomingChunks.clear();
    peerState.clear();
  }

  function startDiscovery() {
    if (!started || discovering) return;

    discovering = true;

    Nearby.startDiscovery(`${serviceId}::`, Strategy.P2P_CLUSTER).catch(() => {
      discovering = false;
    });

    if (discoveryTimeoutId) clearTimeout(discoveryTimeoutId);

    discoveryTimeoutId = setTimeout(() => {
      Nearby.stopDiscovery()
        .catch(() => {})
        .finally(() => {
          discovering = false;
        });
    }, 8000);
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
          JSON.stringify({ type: "REQUEST", requests }),
        ).catch(() => {});
      } else {
        Nearby.sendText(
          peerId,
          JSON.stringify({ type: "NOTHING_TO_REQUEST" }),
        ).catch(() => {});
        markIAmDoneReceiving(peerId);
      }
    }

    if (msg.type === "REQUEST") {
      for (const req of msg.requests) {
        const entity = entityMap.get(req.entity);
        if (!entity) continue;

        for (const id of req.ids) {
          const data = await entity.getById(id);

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

      markTheyAreDoneReceiving(peerId);
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
        entityMap
          .get(msg.entity)
          ?.updateBinary?.(msg.id, chunks.join(""))
          .catch(() => {});

        incomingChunks.delete(key);
      }
    }

    if (msg.type === "NOTHING_TO_REQUEST") {
      markTheyAreDoneReceiving(peerId);
    }

    if (msg.type === "FINISHED_SENDING") {
      markIAmDoneReceiving(peerId);
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
