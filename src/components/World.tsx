import { Canvas } from "@react-three/fiber";
import { KeyboardControls } from "@react-three/drei";
import Game from "@/components/Game";
import Interface from "@/components/Interface";
import GameLoader from "@/components/GameLoader";

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
      <Canvas shadows camera={{ position: [2, 4, 5] }}>
        <Game />
        <color attach="background" args={["#705549"]} />
      </Canvas>
      <GameLoader />
      <Interface />
    </KeyboardControls>
  );
};

export default World;
