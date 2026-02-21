import * as Nearby from "expo-nearby-connections";
import { Strategy } from "expo-nearby-connections";

const ENABLE_MESH_LOGS = true;
const TAG = "[MeshSync:v1]";

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
  let unsubscribers: any[] = [];

  function start() {
    if (started) return;
    started = true;

    log("Starting MeshSync v1 for", deviceId);

    Nearby.startAdvertise(`${serviceId}::${deviceId}`, Strategy.P2P_CLUSTER)
      .then(() => log("Advertise started"))
      .catch((e) => log("Advertise error", e));

    Nearby.startDiscovery(`${serviceId}::`, Strategy.P2P_CLUSTER)
      .then(() => log("Discovery started"))
      .catch((e) => log("Discovery error", e));

    unsubscribers.push(
      Nearby.onPeerFound((peer) => {
        log("Peer found:", peer.peerId);
        Nearby.requestConnection(peer.peerId).catch((e) =>
          log("Connection request failed", e),
        );
      }),

      Nearby.onInvitationReceived(({ peerId }) => {
        log("Invitation received from", peerId);
        Nearby.acceptConnection(peerId).catch((e) => log("Accept failed", e));
      }),

      Nearby.onConnected(({ peerId }) => {
        log("Connected to", peerId);
        sendAllData(peerId);
      }),

      Nearby.onTextReceived(({ peerId, text }) => {
        handleIncoming(peerId, text);
      }),

      Nearby.onDisconnected(({ peerId }) => {
        log("Disconnected from", peerId);
      }),
    );
  }

  function stop() {
    if (!started) return;
    started = false;

    log("Stopping MeshSync v1");

    Nearby.stopAdvertise().catch(() => {});
    Nearby.stopDiscovery().catch(() => {});

    unsubscribers.forEach((u) => {
      if (typeof u === "function") u();
      else if (u && typeof u.remove === "function") u.remove();
    });

    unsubscribers = [];
  }

  async function sendAllData(peerId: string) {
    log("Sending ALL data to", peerId);

    for (const entity of entities) {
      const ids = entity.getIds();

      for (const id of ids) {
        try {
          const data = await entity.getById(id);

          await Nearby.sendText(
            peerId,
            JSON.stringify({
              type: "ENTITY",
              entity: entity.name,
              data,
            }),
          );

          log("Sent entity", entity.name, id);
        } catch (e) {
          log("Failed sending entity", id, e);
        }
      }
    }
  }

  function handleIncoming(peerId: string, raw: string) {
    try {
      const msg = JSON.parse(raw);

      if (msg.type === "ENTITY") {
        log("Received entity", msg.entity);
        const entity = entities.find((e) => e.name === msg.entity);
        entity?.insertMeta(msg.data);
      }
    } catch (e) {
      log("Invalid message from", peerId);
    }
  }

  return { start, stop };
}
