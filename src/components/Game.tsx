import { Physics } from "@react-three/rapier";
import Blocks from "@/components/blocks/Blocks";
import Walls from "@/components/walls/Walls";
import Ball from "@/components/Ball";
import Lights from "@/components/Lights";

interface IProps {}

const Game: React.FC<IProps> = () => {
  return (
    <Physics>
      <Lights />
      <Blocks />
      <Walls />
      <Ball />
    </Physics>
  );
};

export default Game;
