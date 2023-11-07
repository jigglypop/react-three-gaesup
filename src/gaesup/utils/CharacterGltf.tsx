import { useSetGltf } from '@gaesup/stores/animation';
import { colliderAtom } from '@gaesup/stores/collider';
import { ControllerProps } from '@gaesup/type';
import { useLoader } from '@react-three/fiber';
import { useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

let url = '';

export default function CharacterGltf(
  props: Omit<ControllerProps, 'animations'>
) {
  url = props.url;
  const gltf = useLoader(GLTFLoader, props.url);
  const { setGltf } = useSetGltf();
  const { materials, nodes } = gltf;
  const collider = useAtomValue(colliderAtom);

  useEffect(() => {
    setGltf(gltf);
  }, [gltf]);

  return (
    <group {...props.character} position={[0, -collider.height, 0]}>
      <primitive object={nodes!.walk} visible={false} />
      {Object.keys(nodes!).map((name: string, key: number) => {
        if (nodes[name].type === 'SkinnedMesh') {
          return (
            <skinnedMesh
              castShadow
              receiveShadow
              material={materials!![name]}
              geometry={nodes![name].geometry}
              skeleton={nodes![name].skeleton}
              key={key}
            />
          );
        }
      })}
    </group>
  );
}

useLoader.preload(GLTFLoader, url);
