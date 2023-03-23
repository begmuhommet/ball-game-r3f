import { BLOCK_SCALE_SIZE } from "@/consts/consts";
import { Vector3 } from "three";
import useCommonStore from "@/store/useCommonStore";
import { Float, Text3D } from "@react-three/drei";

interface IProps {
  position: Vector3;
}

const StartBlock: React.FC<IProps> = (props) => {
  const { position } = props;
  const geometry = useCommonStore((state) => state.geometry);
  const material = useCommonStore((state) => state.startBlockMaterial);
  const textMaterial = useCommonStore((state) => state.textMaterial);

  return (
    <group position={position}>
      <mesh
        geometry={geometry}
        material={material}
        scale={BLOCK_SCALE_SIZE}
        receiveShadow={true}
      />
      <Float
        speed={1}
        rotationIntensity={1}
        floatIntensity={1}
        floatingRange={[0, 0.2]}
      >
        <Text3D
          font="/fonts/Montserrat.json"
          material={textMaterial}
          size={0.3}
          height={0.2}
          position={[-1, 1, 0.3]}
          castShadow
        >
          Ball game
        </Text3D>
      </Float>
    </group>
  );
};

export default StartBlock;
