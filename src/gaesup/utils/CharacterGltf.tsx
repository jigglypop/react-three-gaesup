import { useSetGltf } from '@gaesup/stores/animation';
import { ControllerProps } from '@gaesup/type';
import { useLoader } from '@react-three/fiber';
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

  useEffect(() => {
    console.log(gltf);
    setGltf(gltf);
  }, [gltf]);

  return (
    <group {...props.character}>
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
