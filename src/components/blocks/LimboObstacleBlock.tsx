import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { Vector3 } from "three";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { BLOCK_SCALE_SIZE } from "@/consts/consts";
import useCommonStore from "@/store/useCommonStore";

interface IProps {
  position: Vector3;
}

const SpinObstacleFloor: React.FC<IProps> = (props) => {
  const { position } = props;

  const [speed] = useState(() => Math.random() * 4);

  const limboObstacleRef = useRef<RapierRigidBody>(null);

  const geometry = useCommonStore((store) => store.geometry);
  const floorMaterial = useCommonStore((store) => store.obstacleBlockMaterial);
  const obstacleMaterial = useCommonStore((store) => store.obstacleMaterial);

  // Frame
  useFrame((state) => {
    if (limboObstacleRef.current) {
      limboObstacleRef.current.setNextKinematicTranslation({
        x: position.x,
        y: Math.sin(state.clock.elapsedTime + speed) + 1.2,
        z: position.z,
      });
    }
  });

  // Renders
  return (
    <group position={position}>
      <mesh
        geometry={geometry}
        material={floorMaterial}
        scale={BLOCK_SCALE_SIZE}
        receiveShadow={true}
      />
      <RigidBody type="kinematicPosition" ref={limboObstacleRef}>
        <mesh
          position={[0, 0.3, 0]}
          geometry={geometry}
          material={obstacleMaterial}
          scale={[0.5, 0.5, 4.8]}
          rotation={[0, Math.PI * 0.5, 0]}
          castShadow={true}
        />
      </RigidBody>
    </group>
  );
};

export default SpinObstacleFloor;
