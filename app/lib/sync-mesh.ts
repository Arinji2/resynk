import * as Nearby from "expo-nearby-connections";
import { Strategy } from "expo-nearby-connections";

const ENABLE_MESH_LOGS = true;
const TAG = "[MeshSync:v2]";

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

  function start() {
    if (started) return;
    started = true;

    log("Starting MeshSync v2 for", deviceId);

    Nearby.startAdvertise(`${serviceId}::${deviceId}`, Strategy.P2P_CLUSTER)
      .then(() => log("Advertise started"))
      .catch((e) => log("Advertise error", e));

    startDiscovery();

    unsubscribers.push(
      Nearby.onPeerFound((peer) => {
        log("Peer found:", peer.peerId, peer.name);

        if (connecting.has(peer.peerId)) {
          log("Already connecting to", peer.peerId);
          return;
        }

        const theirDeviceId = peer.name?.split("::")?.[1] ?? peer.peerId;

        if (deviceId > theirDeviceId) {
          log("Waiting for other device to initiate");
          return;
        }

        log("I am winner. Initiating connection.");
        connecting.add(peer.peerId);

        if (discovering) {
          Nearby.stopDiscovery().catch(() => {});
          discovering = false;
        }

        Nearby.requestConnection(peer.peerId).catch((e) => {
          log("Connection request failed", e);
          connecting.delete(peer.peerId);
        });
      }),

      Nearby.onInvitationReceived(({ peerId }) => {
        log("Invitation received from", peerId);

        connecting.add(peerId);

        Nearby.acceptConnection(peerId).catch((e) => {
          log("Accept failed", e);
          connecting.delete(peerId);
        });
      }),

      Nearby.onConnected(({ peerId }) => {
        log("Connected to", peerId);
        sendAllData(peerId);
      }),

      Nearby.onDisconnected(({ peerId }) => {
        log("Disconnected from", peerId);
        connecting.delete(peerId);
        startDiscovery();
      }),

      Nearby.onTextReceived(({ peerId, text }) => {
        handleIncoming(peerId, text);
      }),
    );
  }

  function stop() {
    if (!started) return;
    started = false;

    log("Stopping MeshSync v2");

    Nearby.stopAdvertise().catch(() => {});
    Nearby.stopDiscovery().catch(() => {});

    unsubscribers.forEach((u) => {
      if (typeof u === "function") u();
      else if (u && typeof u.remove === "function") u.remove();
    });

    unsubscribers = [];
    connecting.clear();
  }

  function startDiscovery() {
    if (discovering || !started) return;

    discovering = true;

    Nearby.startDiscovery(`${serviceId}::`, Strategy.P2P_CLUSTER)
      .then(() => log("Discovery started"))
      .catch((e) => {
        log("Discovery error", e);
        discovering = false;
      });
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
    } catch {
      log("Invalid message from", peerId);
    }
  }

  return { start, stop };
}
