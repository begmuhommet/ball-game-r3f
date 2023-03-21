import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { Euler, Quaternion, Vector3 } from "three";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { BLOCK_SCALE_SIZE } from "@/consts/consts";
import useCommonStore from "@/store/useCommonStore";

interface IProps {
  position: Vector3 | undefined;
}

const SpinObstacleBlock: React.FC<IProps> = (props) => {
  const { position } = props;

  const geometry = useCommonStore((store) => store.geometry);
  const floorMaterial = useCommonStore((store) => store.obstacleBlockMaterial);
  const obstacleMaterial = useCommonStore((store) => store.obstacleMaterial);

  const [speed] = useState(
    () => (Math.random() + 0.2) * (Math.random() > 0.5 ? -1 : 1)
  );

  const spinObstacle = useRef<RapierRigidBody>(null);

  // Frame
  useFrame((state) => {
    if (spinObstacle.current) {
      const quaternion = new Quaternion();
      quaternion.setFromEuler(new Euler(0, state.clock.elapsedTime * speed, 0));
      spinObstacle.current.setNextKinematicRotation(quaternion);
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
      <RigidBody type="kinematicPosition" ref={spinObstacle}>
        <mesh
          position={[0, 0.75, 0]}
          geometry={geometry}
          material={obstacleMaterial}
          scale={[0.3, 1.5, 4.8]}
          castShadow={true}
        />
      </RigidBody>
    </group>
  );
};

export default SpinObstacleBlock;
