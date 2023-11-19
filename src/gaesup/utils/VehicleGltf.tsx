import { controllerInnerType } from '@gaesup/type';
import { Gltf } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

let url = '';
let wheelsUrl = '/wheel.glb';
export default function VehicleGltf(props: controllerInnerType) {
  url = props.url;
  const gltf = useLoader(GLTFLoader, props.url);

  // const { setGltf } = useSetGltf();
  const { materials, nodes } = gltf;
  // const collider = useAtomValue(colliderAtom);

  // useEffect(() => {
  //   setGltf(gltf);
  // }, [gltf]);

  return (
    <>
      <group receiveShadow castShadow {...props.character} position={[0, 0, 0]}>
        <Gltf src={props.url} />
        {/* <primitive
          object={nodes.Scene}
          visible={false}
          receiveShadow
          castShadow
        /> */}
        {/* {Object.keys(nodes!).map((name: string, key: number) => {
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
        })} */}
      </group>
    </>
  );
}

// useLoader.preload(GLTFLoader, url);
