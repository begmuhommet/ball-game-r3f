import React from "react";
import { BufferGeometry, MeshStandardMaterial, Vector3 } from "three";
import { BLOCK_SCALE_SIZE } from "@/consts/consts";

interface IProps {
  geometry: BufferGeometry;
  material: MeshStandardMaterial;
  type: "left" | "right";
  obstaclesCount: number;
}

const SideWall: React.FC<IProps> = (props) => {
  const { geometry, material, type, obstaclesCount } = props;

  const scaleZ = obstaclesCount * BLOCK_SCALE_SIZE.z + 12;

  const positionXLeft = -BLOCK_SCALE_SIZE.x * 0.5 - 0.25;
  const positionXRight = BLOCK_SCALE_SIZE.x * 0.5 + 0.25;
  const positionY = 1.5 - 0.1;
  const positionZ =
    -obstaclesCount * BLOCK_SCALE_SIZE.z * 0.5 - BLOCK_SCALE_SIZE.z / 2;

  const position =
    type === "left"
      ? new Vector3(positionXLeft, positionY, positionZ)
      : new Vector3(positionXRight, positionY, positionZ);

  return (
    <mesh
      receiveShadow={true}
      castShadow={true}
      geometry={geometry}
      material={material}
      position={position}
      scale={[0.5, 3, scaleZ]}
    />
  );
};

export default SideWall;
