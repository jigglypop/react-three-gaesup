'use client';

// import { OrthographicCamera } from '@react-three/drei';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { useAtom } from 'jotai';
// import { useRef } from 'react';
// export default function MiniMap() {
//   return (
//     <Canvas shadows style={{ width: '100vw', height: '100vh' }}>
//       <MiniMapInner />
//     </Canvas>
//   );
// }
//
// export function MiniMapInner() {
//   const minimap = useAtom(minimapAtom);
//   const miniMapCameraRef = useRef();
//
//   const frustumSize = 500;
//   const aspect = 1;
//
//   const miniMapLocationLeftPixels = 100;
//   const miniMapLocationBottomPixels = 8;
//
//   useFrame(({ gl, scene, camera }) => {
//     if (!minimap) {
//       gl.render(minimap, camera);
//     }
//     console.log(minimap);
//     //     gl.autoClear = true;
//     //     gl.setViewport(0, 0, 100, 100);
//     //     gl.setScissor(0, 0, 100, 100);
//     //     gl.setScissorTest(true);
//     // gl.render(minimap, camera);
//     //     gl.autoClear = false;
//     //     gl.clearDepth();
//     //
//     //     // render minicamera
//     //     gl.setViewport(
//     //       miniMapLocationLeftPixels,
//     //       miniMapLocationBottomPixels,
//     //       window.innerWidth * 0.2,
//     //       window.innerHeight * 0.2
//     //     );
//     //     gl.setScissor(
//     //       miniMapLocationLeftPixels,
//     //       miniMapLocationBottomPixels,
//     //       window.innerWidth * 0.2,
//     //       window.innerHeight * 0.2
//     //     );
//     //     gl.setScissorTest(true);
//     //     // miniMapCameraRef.current.zoom = camera.zoom;
//     //     // miniMapCameraRef.current.position.x = camera.position.x;
//     //     // miniMapCameraRef.current.position.y = camera.position.y;
//     //     // miniMapCameraRef.current.aspect = aspect;
//     //     // miniMapCameraRef.current.updateMatrixWorld();
//     //     // miniMapCameraRef.current.updateProjectionMatrix();
//     //     gl.render(minimap, camera);
//     //
//     //     // console.log("%o", camera);
//     //     // console.log("%o", miniMapCameraRef.current);
//   }, 1);
//
//   return (
//     <>
//       <OrthographicCamera
//         ref={miniMapCameraRef}
//         makeDefault={false}
//         zoom={50}
//         position={[0, 0, 100]}
//         left={(frustumSize * aspect) / -2}
//         right={(frustumSize * aspect) / 2}
//         top={frustumSize / 2}
//         bottom={frustumSize / -2}
//         far={1000}
//         near={0.1}
//       />
//     </>
//   );
// }
