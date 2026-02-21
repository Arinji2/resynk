import * as Nearby from "expo-nearby-connections";
import { Strategy } from "expo-nearby-connections";

const ENABLE_MESH_LOGS = true;
const TAG = "[MeshSync:v3]";

function log(...args: any[]) {
  if (!ENABLE_MESH_LOGS) return;
  console.log(TAG, new Date().toISOString(), ...args);
}

type EntityAdapter = {
  name: string;
  getIds: () => string[];
  getById: (id: string) => Promise<any>;
  insertMeta: (data: any) => void;
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

  const entityMap = new Map(entities.map((e) => [e.name, e]));

  function start() {
    if (started) return;
    started = true;

    log("Starting MeshSync v3 for", deviceId);

    Nearby.startAdvertise(`${serviceId}::${deviceId}`, Strategy.P2P_CLUSTER)
      .then(() => log("Advertise started"))
      .catch((e) => log("Advertise error", e));

    startDiscovery();

    unsubscribers.push(
      Nearby.onPeerFound((peer) => {
        log("Peer found:", peer.peerId);

        if (connecting.has(peer.peerId) || syncing.has(peer.peerId)) {
          log("Already busy with peer");
          return;
        }

        const theirDeviceId = peer.name?.split("::")?.[1] ?? peer.peerId;

        if (deviceId > theirDeviceId) {
          log("Waiting for other device to initiate");
          return;
        }

        connecting.add(peer.peerId);

        if (discovering) {
          Nearby.stopDiscovery().catch(() => {});
          discovering = false;
        }

        Nearby.requestConnection(peer.peerId).catch((e) => {
          log("Connection failed", e);
          connecting.delete(peer.peerId);
        });
      }),

      Nearby.onInvitationReceived(({ peerId }) => {
        log("Invitation received from", peerId);
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

    log("Stopping MeshSync v3");

    Nearby.stopAdvertise().catch(() => {});
    Nearby.stopDiscovery().catch(() => {});

    unsubscribers.forEach((u) => {
      if (typeof u === "function") u();
      else if (u && typeof u.remove === "function") u.remove();
    });

    unsubscribers = [];
    connecting.clear();
    syncing.clear();
  }

  function startDiscovery() {
    if (!started || discovering) return;

    discovering = true;

    Nearby.startDiscovery(`${serviceId}::`, Strategy.P2P_CLUSTER)
      .then(() => log("Discovery started"))
      .catch((e) => {
        log("Discovery error", e);
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
    ).catch((e) => log("Handshake send failed", e));
  }

  async function handleMessage(peerId: string, raw: string) {
    let msg: any;

    try {
      msg = JSON.parse(raw);
    } catch {
      return;
    }

    if (msg.type === "HANDSHAKE") {
      log("Received HANDSHAKE from", peerId);

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
      log("Received REQUEST from", peerId);

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
        }
      }

      Nearby.sendText(
        peerId,
        JSON.stringify({ type: "FINISHED_SENDING" }),
      ).catch(() => {});
    }

    if (msg.type === "ENTITY_META") {
      const entity = entityMap.get(msg.entity);
      entity?.insertMeta(msg.data);
    }

    if (msg.type === "NOTHING_TO_REQUEST") {
      log("Nothing to sync from", peerId);
      syncing.delete(peerId);
    }

    if (msg.type === "FINISHED_SENDING") {
      log("Peer finished sending", peerId);
      syncing.delete(peerId);
    }
  }

  return { start, stop };
}
