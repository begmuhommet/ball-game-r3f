import { Mesh, Vector3 } from "three";
import { Float, useGLTF } from "@react-three/drei";
import { BLOCK_SCALE_SIZE } from "@/consts/consts";
import useCommonStore from "@/store/useCommonStore";
import { useFrame } from "@react-three/fiber";

interface IProps {
  position: Vector3;
}

const EndBlock: React.FC<IProps> = (props) => {
  const { position } = props;

  // Hooks
  useFrame((state) => {
    diamond.scene.rotation.set(
      0,
      state.clock.elapsedTime * Math.PI * 2 * 0.1,
      0
    );
  });

  const geometry = useCommonStore((store) => store.geometry);
  const material = useCommonStore((store) => store.endBlockMaterial);

  const diamond = useGLTF("/models/diamond.gltf");
  if (diamond.scene.children[0] instanceof Mesh) {
    diamond.scene.children[0].castShadow = true;
    diamond.scene.children[0].material.flatShading = true;
  }

  return (
    <group position={position}>
      <mesh
        receiveShadow={true}
        geometry={geometry}
        material={material}
        scale={BLOCK_SCALE_SIZE}
      />
      <Float
        speed={10}
        rotationIntensity={0}
        floatIntensity={1}
        floatingRange={[0, 0.2]}
      >
        <primitive object={diamond.scene} position-y={1} />
        <pointLight position={[0, 0.8, 1.5]} intensity={0.5} />
      </Float>
    </group>
  );
};

export default EndBlock;
