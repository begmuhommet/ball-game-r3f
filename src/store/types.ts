import { BoxGeometry, MeshStandardMaterial } from "three";

export enum Statuses {
  Ready = "Ready",
  Started = "Started",
  Finished = "Finished",
}

export interface ICommonStore {
  blockCount: number;
  status: Statuses;
  startTime: number;
  endTime: number;

  geometry: BoxGeometry;
  startBlockMaterial: MeshStandardMaterial;
  endBlockMaterial: MeshStandardMaterial;
  obstacleBlockMaterial: MeshStandardMaterial;
  obstacleMaterial: MeshStandardMaterial;
  textMaterial: MeshStandardMaterial;
  wallMaterial: MeshStandardMaterial;

  setStatus: (newStatus: Statuses) => void;
  setStartTime: (time: number) => void;
  setEndTime: (time: number) => void;
}
