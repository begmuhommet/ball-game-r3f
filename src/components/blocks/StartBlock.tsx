import { BLOCK_SCALE_SIZE } from "@/consts/consts";
import { Vector3 } from "three";
import useCommonStore from "@/store/useCommonStore";

interface IProps {
  position: Vector3;
}

const StartBlock: React.FC<IProps> = (props) => {
  const { position } = props;
  const geometry = useCommonStore((state) => state.geometry);
  const material = useCommonStore((state) => state.startBlockMaterial);

  return (
    <group position={position}>
      <mesh
        geometry={geometry}
        material={material}
        scale={BLOCK_SCALE_SIZE}
        receiveShadow={true}
      />
    </group>
  );
};

export default StartBlock;
