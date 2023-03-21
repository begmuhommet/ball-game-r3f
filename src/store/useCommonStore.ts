import { create, State } from "zustand";

import { BoxGeometry, ColorManagement, MeshStandardMaterial } from "three";
import { Statuses } from "@/store/types";

ColorManagement.legacyMode = false;

const useCommonStore = create((set) => ({
  blockCount: 2,
  status: Statuses.Ready,
  startTime: 0,
  endTime: 0,

  geometry: new BoxGeometry(1, 1, 1),
  startBlockMaterial: new MeshStandardMaterial({ color: "orange" }),
  endBlockMaterial: new MeshStandardMaterial({ color: "limegreen" }),
  obstacleBlockMaterial: new MeshStandardMaterial({ color: "greenyellow" }),
  obstacleMaterial: new MeshStandardMaterial({ color: "orangered" }),
  wallMaterial: new MeshStandardMaterial({ color: "gray" }),

  setStatus: (newStatus: Statuses) =>
    set((state: State) => ({ status: newStatus })),

  setStartTime: (time: number) => set((state: State) => ({ startTime: time })),
  setEndTime: (time: number) => set((state: State) => ({ endTime: time })),
}));

export default useCommonStore;
