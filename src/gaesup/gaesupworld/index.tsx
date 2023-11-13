import { Canvas } from '@react-three/fiber';

export default function GaeSupWorld({ children }: { children: JSX.Element }) {
  const meshes: any = [];

  const getMeshs = (el: JSX.Element) => {
    // if (object.userData && object.userData.camExcludeCollision) return;
    // if (
    //   object instanceof THREE.Mesh &&
    //   object.geometry.type !== 'InstancedBufferGeometry'
    // ) {
    //   intersectObjectMap[object.uuid] = object;
    // }
    console.log(el);
    meshes.push(el);
    if (!el || !el.props || !el.props.children) return;
    if (el.props.children.length > 0) {
      el.props.children.forEach((child) => {
        getMeshs(child); // Continue the traversal for all child objects
      });
    }
    // el.props.children.forEach((child) => {
    //   getMeshs(child); // Continue the traversal for all child objects
    // });
  };
  getMeshs(children);
  console.log(meshes);
  return (
    <>
      {/* {meshes.map((Mesh: any) => {
        console.log(Mesh);
        return <Mesh />;
        // return mesh.props;
      })} */}
      <Canvas shadows style={{ width: '100vw', height: '100vh' }}>
        {children}
      </Canvas>
      {/* <Canvas
        shadows
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          border: '1px solid red',
          borderRadius: '50%',
          width: '20rem',
          height: '20rem',
          zIndex: 1000000
        }}
      >
        {children}
      </Canvas> */}

      {/* {children} */}
    </>
  );
}
