import SideWall from "./SideWall";
import BackWall from "./BackWall";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { BLOCK_SCALE_SIZE } from "@/consts/consts";
import useCommonStore from "@/store/useCommonStore";

interface IProps {}

const Walls: React.FC<IProps> = () => {
  const blockCount = useCommonStore((store) => store.blockCount);
  const positionZ =
    -blockCount * BLOCK_SCALE_SIZE.z * 0.5 - BLOCK_SCALE_SIZE.z / 2;
  const width = (blockCount * BLOCK_SCALE_SIZE.z + 12) / 2;

  const geometry = useCommonStore((store) => store.geometry);
  const wallMaterial = useCommonStore((store) => store.wallMaterial);

  return (
    <RigidBody type="fixed" restitution={0.2} friction={0}>
      <SideWall
        geometry={geometry}
        material={wallMaterial}
        type="left"
        obstaclesCount={blockCount}
      />
      <SideWall
        geometry={geometry}
        material={wallMaterial}
        type="right"
        obstaclesCount={blockCount}
      />
      <BackWall
        geometry={geometry}
        material={wallMaterial}
        obstaclesCount={blockCount}
      />
      <CuboidCollider
        position={[0, 0, positionZ]}
        args={[BLOCK_SCALE_SIZE.x / 2, BLOCK_SCALE_SIZE.y / 2, width]}
        restitution={0.2}
        friction={1}
      />
    </RigidBody>
  );
};

export default Walls;
