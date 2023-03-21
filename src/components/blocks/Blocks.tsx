import StartBlock from "@/components/blocks/StartBlock";
import { Vector3 } from "three";
import SpinObstacleBlock from "@/components/blocks/SpinObstacleBlock";
import AxeObstacleBlock from "@/components/blocks/AxeObstacleBlock";
import LimboObstacleBlock from "@/components/blocks/LimboObstacleBlock";
import { BLOCK_SCALE_SIZE } from "@/consts/consts";
import { useMemo } from "react";
import EndBlock from "@/components/blocks/EndBlock";
import useCommonStore from "@/store/useCommonStore";

const blocks = [SpinObstacleBlock, AxeObstacleBlock, LimboObstacleBlock];

interface IProps {}

const Blocks: React.FC<IProps> = () => {
  const blockCount = useCommonStore((store) => store.blockCount);

  const obstacles = useMemo(() => {
    const obstacles = [];
    for (let i = 0; i < blockCount; i++) {
      const blockIndex = Math.floor(Math.random() * blocks.length);
      obstacles.push(blocks[blockIndex]);
    }
    return obstacles;
  }, [blockCount, blocks]);

  return (
    <>
      <StartBlock position={new Vector3(0, 0, 0)} />

      {obstacles.map((Obstacle, index) => (
        <Obstacle
          key={index}
          position={new Vector3(0, 0, -(index + 1) * BLOCK_SCALE_SIZE.z)}
        />
      ))}

      <EndBlock
        position={new Vector3(0, 0, -(blockCount + 1) * BLOCK_SCALE_SIZE.z)}
      />
    </>
  );
};

export default Blocks;
