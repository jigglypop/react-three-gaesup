'use client';

import Controller from '@gaesup/index';
import GaeSupTools from '@gaesup/tools';
import { Environment, KeyboardControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';

import DynamicPlatforms from 'component/platform/DynamicPlatforms';
import FloatMove from 'component/platform/FloatMove';
import Floor from 'component/platform/Floor';
import RigidObjects from 'component/platform/RigidObjects';
import RoughPlane from 'component/platform/RoughPlane';
import Slopes from 'component/platform/Slopes';

export default function Main() {
  const keyboardMap = [
    { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
    { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
    { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
    { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
    { name: 'jump', keys: ['Space'] },
    { name: 'run', keys: ['Shift'] },
    { name: 'greet', keys: ['KeyZ'] }
  ];

  const URL = './gaesup.glb';

  return (
    <>
      <Canvas
        shadows
        style={{ width: '100vw', height: '100vh' }}
        camera={{
          fov: 65,
          near: 0.1,
          far: 1000
        }}
      >
        <Environment background preset='sunset' blur={0.8} />
        <directionalLight
          castShadow
          shadow-normalBias={0.06}
          position={[20, 30, 10]}
          intensity={0.5}
          shadow-mapSize={[1024, 1024]}
          shadow-camera-near={1}
          shadow-camera-far={50}
          shadow-camera-top={50}
          shadow-camera-right={50}
          shadow-camera-bottom={-50}
          shadow-camera-left={-50}
        />
        <ambientLight intensity={0.5} />
        <Physics>
          <KeyboardControls map={keyboardMap}>
            <Controller
              url={URL}
              options={{ debug: false, controllerType: 'keyboard' }}
              character={{
                scale: 0.3,
                position: [0, -0.55, 0]
              }}
              onAnimate={({ keyControl, states, playAnimation }) => {
                const { greet } = keyControl;
                if (greet) {
                  states.isAnimationOuter = true;
                  playAnimation('greet');
                } else {
                  states.isAnimationOuter = false;
                }
              }}
            />
          </KeyboardControls>
          <RoughPlane />
          <Slopes />
          <RigidObjects />
          <FloatMove />
          <DynamicPlatforms />
          <Floor />
        </Physics>
      </Canvas>
      <GaeSupTools keyboardMap={keyboardMap} />
    </>
  );
}
