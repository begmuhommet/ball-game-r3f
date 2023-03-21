import { useEffect, useRef, useState } from "react";
import { RapierRigidBody } from "@react-three/rapier";
import { useKeyboardControls } from "@react-three/drei";
import { Vector3 } from "three";
import { RootState, useFrame } from "@react-three/fiber";
import useCommonStore from "@/store/useCommonStore";
import { Statuses } from "@/store/types";
import { BLOCK_SCALE_SIZE } from "@/consts/consts";

const useBallControls = () => {
  // Global store
  const status = useCommonStore((state) => state.status);
  const setStatus = useCommonStore((state) => state.setStatus);
  const blockCount = useCommonStore((state) => state.blockCount);
  const setEndTime = useCommonStore((state) => state.setEndTime);
  const setStartTime = useCommonStore((state) => state.setStartTime);

  // Local state
  const [smoothCameraPosition, setSmoothCameraPosition] = useState(
    () => new Vector3(10, 10, 0)
  );
  const [smoothCameraTarget, setSmoothCameraTarget] = useState(
    () => new Vector3()
  );

  // Hooks
  const bodyRef = useRef<RapierRigidBody>(null);
  const [subscribeKeys, getKeys] = useKeyboardControls();
  useFrame((state, delta) => {
    keyboardControl(delta);
    cameraControl(state, delta);
    if (
      bodyRef.current &&
      bodyRef.current.translation().z < -blockCount * BLOCK_SCALE_SIZE.z - 5 &&
      status === Statuses.Started
    ) {
      setStatus(Statuses.Finished);
      setEndTime(Date.now());
    }

    if (bodyRef.current && bodyRef.current.translation().y < -2) {
      setStatus(Statuses.Finished);
      setStatus(Statuses.Ready);
    }
  });

  // Variables and functions
  const keyboardControl = (delta: number) => {
    if (
      !bodyRef.current ||
      status === Statuses.Ready ||
      status === Statuses.Finished
    )
      return;

    const { forward, backward, leftward, rightward } = getKeys();

    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 0.6 * delta;
    const torqueStrength = 0.2 * delta;

    if (forward) {
      impulse.z -= impulseStrength;
      torque.x -= torqueStrength;
    }

    if (backward) {
      impulse.z += impulseStrength;
      torque.x += torqueStrength;
    }

    if (leftward) {
      impulse.x -= impulseStrength;
      torque.z += torqueStrength;
    }

    if (rightward) {
      impulse.x += impulseStrength;
      torque.z -= torqueStrength;
    }

    bodyRef.current.applyImpulse(impulse, true);
    bodyRef.current.applyTorqueImpulse(torque, true);
  };

  const cameraControl = (state: RootState, delta: number) => {
    if (!bodyRef.current) return;
    const ballPosition = bodyRef.current.translation();

    const cameraPosition = new Vector3(
      ballPosition.x,
      ballPosition.y + 0.6,
      ballPosition.z + 2.2
    );

    const cameraTarget = new Vector3(
      ballPosition.x,
      ballPosition.y + 0.2,
      ballPosition.z
    );

    smoothCameraPosition.lerp(cameraPosition, 5 * delta);
    smoothCameraTarget.lerp(cameraTarget, 5 * delta);

    state.camera.position.copy(smoothCameraPosition);
    state.camera.lookAt(smoothCameraTarget);
  };

  const jumpControl = (value: boolean) => {
    const translationY = bodyRef.current?.translation().y;
    if (
      value &&
      bodyRef.current &&
      translationY! < 0.4 &&
      useCommonStore.getState().status === Statuses.Started
    ) {
      bodyRef.current.applyImpulse({ x: 0, y: 0.4, z: 0 }, true);
    }
  };

  const restart = (stat: Statuses, prevStat: Statuses) => {
    if (
      bodyRef.current &&
      prevStat === Statuses.Finished &&
      stat === Statuses.Ready
    ) {
      bodyRef.current.setTranslation({ x: 0, y: 1, z: 0 }, true);
      bodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
      bodyRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
    }
  };

  const unsubscribeStatus = useCommonStore.subscribe(
    (state) => state.status,
    (stat, prevStat) => restart(stat, prevStat),
    { fireImmediately: true }
  );

  // Effects
  useEffect(() => {
    const unsubscribeJump = subscribeKeys((state) => state.jump, jumpControl);
    return () => {
      unsubscribeJump && unsubscribeJump();
      unsubscribeStatus && unsubscribeStatus();
    };
  }, []);

  return [bodyRef];
};

export default useBallControls;
