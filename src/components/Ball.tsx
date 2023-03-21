import { RigidBody } from "@react-three/rapier";
import useBallControls from "@/hooks/useBallControls";

interface IProps {}

const Ball: React.FC<IProps> = () => {
  const [bodyRef] = useBallControls();

  return (
    <RigidBody
      ref={bodyRef}
      colliders="ball"
      position={[0, 1, 0]}
      friction={1}
      restitution={0.2}
      linearDamping={0.5}
    >
      <mesh castShadow={true}>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial flatShading={true} color="mediumpurple" />
      </mesh>
    </RigidBody>
  );
};

export default Ball;
