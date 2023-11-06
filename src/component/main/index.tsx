'use client';

import Controller from '@gaesup/index';
import { Environment, Gltf, KeyboardControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Physics, RigidBody } from '@react-three/rapier';

export default function Main() {
  const keyboardMap = [
    { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
    { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
    { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
    { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
    { name: 'jump', keys: ['Space'] },
    { name: 'run', keys: ['Shift'] },
    { name: 'action1', keys: ['1'] },
    { name: 'action2', keys: ['2'] },
    { name: 'action3', keys: ['3'] },
    { name: 'action4', keys: ['KeyF'] }
  ];

  const URL = './gaesup.glb';

  return (
    <>
      <Canvas shadows style={{ width: '100vw', height: '100vh' }}>
        <Environment background preset='sunset' blur={0.8} />
        <directionalLight
          intensity={0.7}
          castShadow
          shadow-bias={-0.0004}
          position={[-20, 20, 20]}
        >
          <orthographicCamera attach='shadow-camera' args={[20, 20, 20, -20]} />
        </directionalLight>
        <ambientLight intensity={0.2} />
        <Physics timeStep='vary' colliders='trimesh' debug>
          <KeyboardControls map={keyboardMap}>
            <Controller
              url={URL}
              options={{ debug: true }}
              character={{
                scale: 0.3,
                position: [0, -0.55, 0]
              }}
            />
          </KeyboardControls>

          <RigidBody type='fixed' colliders='trimesh'>
            <Gltf
              castShadow
              receiveShadow
              rotation={[-Math.PI / 2, 0, Math.PI]}
              scale={0.11}
              src='/fantasy_game_inn2-transformed.glb'
            />
          </RigidBody>
        </Physics>
      </Canvas>
    </>
  );
}
