import { useEffect, useRef, useState } from "react";
import { RapierRigidBody } from "@react-three/rapier";
import { useKeyboardControls } from "@react-three/drei";
import { Vector3 } from "three";
import { RootState, useFrame } from "@react-three/fiber";

const useBallControls = () => {
  const bodyRef = useRef<RapierRigidBody>(null);
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const [smoothCameraPosition, setSmoothCameraPosition] = useState(
    () => new Vector3(10, 10, 10)
  );
  const [smoothCameraTarget, setSmoothCameraTarget] = useState(
    () => new Vector3()
  );

  const keyboardControl = (delta: number) => {
    if (!bodyRef.current) return;

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

  const jumpControl = () => {
    return subscribeKeys(
      (state) => state.jump,
      (value) => {
        const translationY = bodyRef.current?.translation().y;
        if (value && bodyRef.current && translationY! < 0.4) {
          bodyRef.current.applyImpulse({ x: 0, y: 0.4, z: 0 }, true);
        }
      }
    );
  };

  useFrame((state, delta) => {
    keyboardControl(delta);
    cameraControl(state, delta);
  });

  useEffect(() => {
    const unsubscribe = jumpControl();
    return () => unsubscribe();
  }, []);

  return [bodyRef];
};

export default useBallControls;
