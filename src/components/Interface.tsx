import { useKeyboardControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { addEffect } from "@react-three/fiber";
import useCommonStore from "@/store/useCommonStore";
import { Statuses } from "@/store/types";

const btnClasses = "w-10 h-10 border border-white rounded-md transition-colors";
const activeClasses = "bg-white";

const Interface = () => {
  const {} = useKeyboardControls();

  // Store
  const { status, setStatus, setStartTime } = useCommonStore((state) => ({
    status: state.status,
    setStatus: state.setStatus,
    setStartTime: state.setStartTime,
    setEndTime: state.setEndTime,
  }));

  // Hooks
  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const rightward = useKeyboardControls((state) => state.rightward);
  const jump = useKeyboardControls((state) => state.jump);
  const [subscribeKeys] = useKeyboardControls();

  const timeRef = useRef<HTMLDivElement | null>(null);

  // Effects
  useEffect(() => {
    const unsubscribe = addEffect(() => {
      const status = useCommonStore.getState().status;
      if (!timeRef.current) return;

      const startTime = useCommonStore.getState().startTime;
      const endTime = useCommonStore.getState().endTime;
      let time = 0;

      if (status === Statuses.Ready) {
        timeRef.current.textContent = "00.00";

        return;
      }
      if (status === Statuses.Started) {
        time = (Date.now() - startTime) / 1000;
        timeRef.current.textContent = time.toFixed(2);
      } else if (status === Statuses.Finished) {
        time = (endTime - startTime) / 1000;
        timeRef.current.textContent = time.toFixed(2);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeKeys(
      (state) => state.start,
      () => handleStartGame()
    );

    return () => unsubscribe();
  }, []);

  // Handlers
  const handleStartGame = () => {
    const status = useCommonStore.getState().status;
    if (status === Statuses.Ready) {
      setStatus(Statuses.Started);
      setStartTime(Date.now());
    }
  };

  const handleRestartGame = () => {
    if (status === Statuses.Finished) {
      setStatus(Statuses.Ready);
      if (timeRef.current) {
        timeRef.current.textContent = "00.00";
      }
    }
  };

  // Renders
  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen ${
        status !== Statuses.Started ? "bg-[rgba(0,0,0,0.8)]" : ""
      }`}
    >
      <div
        ref={timeRef}
        className="fixed top-10 right-10 text-white font-bold text-3xl"
      >
        00.00
      </div>

      {status === Statuses.Finished && (
        <button
          className="fixed top-1/3 left-1/2 transform -translate-x-1/2 text-white font-black text-4xl bg-yellow-700 hover:bg-yellow-800 rounded-xl px-8 py-6 shadow-gray-800 shadow-2xl active:scale-95 transition-all"
          onClick={handleRestartGame}
        >
          Restart
        </button>
      )}

      {status === Statuses.Ready && (
        <button
          className="fixed top-1/3 left-1/2 transform -translate-x-1/2 text-white font-black text-4xl bg-green-900 hover:bg-green-700 rounded-xl px-8 py-6 shadow-gray-800 shadow-2xl active:scale-95 transition-all"
          onClick={handleStartGame}
        >
          Start
        </button>
      )}

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
