import { create } from "zustand";

import { BoxGeometry, ColorManagement, MeshStandardMaterial } from "three";
import { ICommonStore, Statuses } from "@/store/types";
import { subscribeWithSelector } from "zustand/middleware";

ColorManagement.legacyMode = false;

const useCommonStore = create(
  subscribeWithSelector<ICommonStore>((set) => ({
    blockCount: 20,
    status: Statuses.Ready,
    startTime: 0,
    endTime: 0,

    geometry: new BoxGeometry(1, 1, 1),
    startBlockMaterial: new MeshStandardMaterial({ color: "orange" }),
    endBlockMaterial: new MeshStandardMaterial({ color: "limegreen" }),
    obstacleBlockMaterial: new MeshStandardMaterial({ color: "greenyellow" }),
    obstacleMaterial: new MeshStandardMaterial({ color: "orangered" }),
    textMaterial: new MeshStandardMaterial(),
    wallMaterial: new MeshStandardMaterial({ color: "gray" }),

    setStatus: (newStatus: Statuses) => set(() => ({ status: newStatus })),
    setStartTime: (time: number) => set(() => ({ startTime: time })),
    setEndTime: (time: number) => set(() => ({ endTime: time })),
  }))
);

export default useCommonStore;
