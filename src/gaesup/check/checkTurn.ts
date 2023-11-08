import { RapierRigidBody } from '@react-three/rapier';
import { RefObject } from 'react';

export default function checkTurn({
  rigidBodyRef
}: {
  rigidBodyRef: RefObject<RapierRigidBody>;
}) {
  //   const slopeRay = useAtomValue(slopeRayAtom);
  //   const { isMoving, isRotated } = useAtomValue(statesAtom);
  //   const current = useAtomValue(currentAtom);
  //   const [_, getKeys] = useKeyboardControls();
  //   const { run } = getKeys();
  //   const ratio = useAtomValue(ratioAtom);
  //   const move = useAtomValue(moveAtom);
  //
  //   useFrame(() => {
  //     if (isMoving && rigidBodyRef && rigidBodyRef.current) {
  //       if (
  //         // maxAngle = 1
  //         slopeRay.currentAngle < 1 &&
  //         0.2 < Math.abs(slopeRay.angle) &&
  //         Math.abs(slopeRay.angle) < 1
  //       ) {
  //         move.direction.set(
  //           0,
  //           Math.sin(slopeRay.angle),
  //           Math.cos(slopeRay.angle)
  //         );
  //       }
  //       // else if (slopeRay.currentAngle >= 1) {
  //       //   move.direction.set(
  //       //     0,
  //       //     Math.sin(slopeRay.angle) > 0 ? 0 : Math.sin(slopeRay.angle),
  //       //     Math.sin(slopeRay.angle) > 0 ? 0.1 : 1
  //       //   );
  //       // }
  //       else {
  //         move.direction.set(0, 0, 1);
  //       }
  //       const M = rigidBodyRef.current.mass();
  //       const A = move.accelation;
  //       const F = A.multiplyScalar(M);
  //
  //       const impulseY = () => {
  //         if (slopeRay.angle === 0) {
  //           return 0;
  //         } else {
  //           const runDelta = run ? ratio.run : 1;
  //           const { upExtraForce, downExtraForce } = slopeRay;
  //           const upDownDelta =
  //             move.direction.y > 0 ? upExtraForce : downExtraForce;
  //           return (move.direction.y * runDelta * upDownDelta) / move.turnSpeed;
  //         }
  //       };
  //       const impulseXZRotated = (isRotated: boolean, xz: 'x' | 'z') => {
  //         if (isRotated) {
  //           return F[xz];
  //         } else {
  //           return F[xz] / move.turnSpeed;
  //         }
  //       };
  //       // 세팅
  //       move.impulse.set(
  //         impulseXZRotated(isRotated, 'x'),
  //         impulseY(),
  //         impulseXZRotated(isRotated, 'z')
  //       );
  //
  //       rigidBodyRef.current.applyImpulseAtPoint(
  //         move.impulse,
  //         vec3().copy(current.position).add(move.delta),
  //         false
  //       );
  //     }
  //   });
}
