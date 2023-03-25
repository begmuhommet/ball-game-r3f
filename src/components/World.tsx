import { Canvas } from "@react-three/fiber";
import { KeyboardControls, Loader } from "@react-three/drei";
import Game from "@/components/Game";
import Interface from "@/components/Interface";
import { Suspense } from "react";

const World = () => {
  return (
    <KeyboardControls
      map={[
        { name: "forward", keys: ["ArrowUp", "KeyW"] },
        { name: "backward", keys: ["ArrowDown", "KeyS"] },
        { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
        { name: "rightward", keys: ["ArrowRight", "KeyD"] },
        { name: "jump", keys: ["Space"] },
        { name: "start", keys: ["Enter"] },
      ]}
    >
      <Suspense fallback={null}>
        <Canvas shadows camera={{ position: [2, 4, 5] }}>
          <Game />
          <color attach="background" args={["#37343D"]} />
        </Canvas>
      </Suspense>
      <Loader />
      <Interface />
    </KeyboardControls>
  );
};

export default World;
