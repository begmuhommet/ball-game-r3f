import { Canvas } from "@react-three/fiber";
import { KeyboardControls, Loader, OrbitControls } from "@react-three/drei";
import Game from "@/components/Game";
import { Perf } from "r3f-perf";
import Interface from "@/components/Interface";

interface IProps {}

const World: React.FC<IProps> = () => {
  return (
    <KeyboardControls
      map={[
        { name: "forward", keys: ["ArrowUp", "KeyW"] },
        { name: "backward", keys: ["ArrowDown", "KeyS"] },
        { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
        { name: "rightward", keys: ["ArrowRight", "KeyD"] },
        { name: "jump", keys: ["Space"] },
      ]}
    >
      <Canvas shadows camera={{ position: [2, 4, 5] }}>
        <Perf position="top-left" />
        <Loader
          // containerStyles={} // Flex layout styles
          // innerStyles={} // Inner container styles
          // barStyles={} // Loading-bar styles
          // dataStyles={} // Text styles
          dataInterpolation={(p) => `Loading ${p.toFixed(2)}%`} // Text
          initialState={(active) => active} // Initial black out state
        />
        <OrbitControls />

        <Game />
      </Canvas>
      <Interface />
    </KeyboardControls>
  );
};

export default World;
