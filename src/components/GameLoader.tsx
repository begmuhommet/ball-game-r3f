import { useProgress } from "@react-three/drei";

const GameLoader = () => {
  const { progress } = useProgress();

  if (progress === 100) {
    return <></>;
  }

  return (
    <div className="w-screen h-screen fixed top-0 left-0 z-10 bg-black flex flex-col items-center justify-center">
      <div className="w-[200px] h-5 border border-white rounded mb-2 overflow-hidden">
        <div
          className={`transition-all w-[${progress}%] h-full bg-white rounded`}
        />
      </div>
      <h1 className="text-white">{progress} %</h1>
    </div>
  );
};

export default GameLoader;
