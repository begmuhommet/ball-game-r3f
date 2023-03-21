import { BLOCK_SCALE_SIZE } from "@/consts/consts";
import { BufferGeometry, MeshStandardMaterial, Vector3 } from "three";
import React from "react";

interface IProps {
  geometry: BufferGeometry;
  material: MeshStandardMaterial;
  obstaclesCount: number;
}

const BackWall: React.FC<IProps> = (props) => {
  const { geometry, material, obstaclesCount } = props;

  const position = new Vector3(
    0,
    1.5 - BLOCK_SCALE_SIZE.y / 2,
    -obstaclesCount * BLOCK_SCALE_SIZE.z - 10 + 0.76
  );

  return (
    <mesh
      geometry={geometry}
      material={material}
      position={position}
      scale={[BLOCK_SCALE_SIZE.x + 1, 3, 0.5]}
    />
  );
};

export default BackWall;
