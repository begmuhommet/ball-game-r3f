import { useKeyboardControls } from "@react-three/drei";
import { useEffect } from "react";
import { addEffect } from "@react-three/fiber";

const btnClasses = "w-10 h-10 border border-white rounded-md transition-colors";
const activeClasses = "bg-white";

const Interface = () => {
  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const rightward = useKeyboardControls((state) => state.rightward);
  const jump = useKeyboardControls((state) => state.jump);

  useEffect(() => {
    const unsubscribe = addEffect(() => {
      console.log("tick");
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.4)]">
      <div className="fixed top-10 right-10 text-white font-bold text-3xl">
        00.00
      </div>

      {/*<div className="w-screen fixed top-1/4 bg-[rgba(0,0,0,0.5)] p-4 flex items-center justify-center">*/}
      {/*  <h1 className="text-white font-black text-5xl">Start</h1>*/}
      {/*</div>*/}

      <div className="w-screen fixed top-1/4 bg-[rgba(0,0,0,0.5)] p-4 flex items-center justify-center">
        <button className="text-white font-black text-2xl bg-blue-500 hover:bg-blue-400 rounded-md p-3">
          Start
        </button>
      </div>

      <div className="w-36 fixed bottom-10 right-10 grid grid-cols-3 gap-2">
        <div
          className={`${btnClasses} col-start-2 col-span-2 ${
            forward ? activeClasses : ""
          }`}
        ></div>
        <div className={`${btnClasses} ${leftward ? activeClasses : ""}`}></div>
        <div className={`${btnClasses} ${backward ? activeClasses : ""}`}></div>
        <div
          className={`${btnClasses} ${rightward ? activeClasses : ""}`}
        ></div>
        <div
          className={`w-full h-10 border border-white rounded-md col-start-1 col-end-4 transition-colors ${
            jump ? activeClasses : ""
          }`}
        ></div>
      </div>
    </div>
  );
};

export default Interface;
