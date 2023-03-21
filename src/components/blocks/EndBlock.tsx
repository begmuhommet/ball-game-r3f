import { Vector3 } from "three";
import { useGLTF } from "@react-three/drei";
import { BLOCK_SCALE_SIZE } from "@/consts/consts";
import useCommonStore from "@/store/useCommonStore";

interface IProps {
  position: Vector3;
}

const EndBlock: React.FC<IProps> = (props) => {
  const { position } = props;

  const geometry = useCommonStore((store) => store.geometry);
  const material = useCommonStore((store) => store.endBlockMaterial);

  const diamond = useGLTF("/models/diamond.gltf");

  return (
    <group position={position}>
      <mesh
        receiveShadow={true}
        geometry={geometry}
        material={material}
        scale={BLOCK_SCALE_SIZE}
      />
      <primitive object={diamond.scene} position-y={1} />
    </group>
  );
};

export default EndBlock;
