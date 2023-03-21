import { useRef } from "react";
import { DirectionalLight } from "three";
import { useFrame } from "@react-three/fiber";

interface IProps {}

const Lights: React.FC<IProps> = () => {
  const lightRef = useRef<DirectionalLight>(null);

  useFrame((state) => {
    if (!lightRef.current) return;
    lightRef.current.position.z = state.camera.position.z - 3;
    lightRef.current.target.position.z = state.camera.position.z - 3;
  });

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight
        castShadow={true}
        ref={lightRef}
        position={[4, 4, 1]}
        intensity={1}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={10}
        shadow-camera-right={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
      />
    </>
  );
};

export default Lights;
