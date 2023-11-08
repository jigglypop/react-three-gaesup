import { currentAtom } from '@gaesup/stores/current';
import { dampingAtom } from '@gaesup/stores/damping';
import { moveAtom } from '@gaesup/stores/move';
import { ratioAtom } from '@gaesup/stores/ratio';
import { rayAtom } from '@gaesup/stores/ray/atom';
import { slopeRayAtom } from '@gaesup/stores/slopRay/atom';
import { standAtom } from '@gaesup/stores/stand';
import { statesAtom } from '@gaesup/stores/states';
import { useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { RapierRigidBody, vec3 } from '@react-three/rapier';
import { useAtomValue } from 'jotai';
import { RefObject } from 'react';

export default function calcImpulse({
  rigidBodyRef // standingForcePoint
}: {
  rigidBodyRef: RefObject<RapierRigidBody>;
}) {
  const ray = useAtomValue(rayAtom);
  const damping = useAtomValue(dampingAtom);
  // const buoyancy = useAtomValue(buoyancyAtom);
  const stand = useAtomValue(standAtom);
  const slopeRay = useAtomValue(slopeRayAtom);
  const { isMoving, isRotated } = useAtomValue(statesAtom);
  const current = useAtomValue(currentAtom);
  const [_, getKeys] = useKeyboardControls();
  const { run } = getKeys();
  const ratio = useAtomValue(ratioAtom);
  const move = useAtomValue(moveAtom);
  const { isNotMoving, isOnMoving, isOnTheGround } = useAtomValue(statesAtom);

  useFrame(() => {
    if (!rigidBodyRef || !rigidBodyRef.current) return null;
    if (ray.rayHit !== null && ray.rayParent && isOnTheGround) {
      if (isOnTheGround) {
        const { dragXZ, dragY } = damping;
        const forwardF = (xz: 'x' | 'z') =>
          isOnMoving && isNotMoving ? move.velocity[xz] * dragXZ : 0;
        const reverseF = (xz: 'x' | 'z') =>
          isNotMoving ? current.velocity[xz] * dragXZ : 0;
        // calc up impulse (Y)
        const K = damping.springConstant;
        const dY = damping.distance - ray.rayHit.toi;
        const sY = rigidBodyRef.current.linvel().y;
        const impulseY = K * dY - dragY * sY;
        rigidBodyRef.current.applyImpulse(
          vec3({
            x: forwardF('x') - reverseF('x'),
            y: impulseY,
            z: forwardF('z') - reverseF('z')
          }),
          false
        );
        move.mass.set(0, Math.min(-impulseY, 0), 0);
        ray.rayParent.applyImpulseAtPoint(move.mass, stand.position, true);
      }
    }

    if (isMoving) {
      if (
        // maxAngle = 1
        slopeRay.currentAngle < 1 &&
        0.2 < Math.abs(slopeRay.angle) &&
        Math.abs(slopeRay.angle) < 1
      ) {
        move.direction.set(
          0,
          Math.sin(slopeRay.angle),
          Math.cos(slopeRay.angle)
        );
      }
      // else if (slopeRay.currentAngle >= 1) {
      //   move.direction.set(
      //     0,
      //     Math.sin(slopeRay.angle) > 0 ? 0 : Math.sin(slopeRay.angle),
      //     Math.sin(slopeRay.angle) > 0 ? 0.1 : 1
      //   );
      // }
      else {
        move.direction.set(0, 0, 1);
      }
      const M = rigidBodyRef.current.mass();
      const A = move.accelation;
      const F = A.multiplyScalar(M);

      const turnVector = vec3({
        x: 1,
        y: 1,
        z: 1
      }).multiplyScalar(isRotated ? 1 : 1 / move.turnSpeed);

      // 세팅
      move.impulse
        .set(
          F.x,
          move.direction.y * (Math.abs(Math.sin(slopeRay.angle)) * 0.1),
          F.z
        )
        .multiply(turnVector);

      rigidBodyRef.current.applyImpulseAtPoint(
        move.impulse,
        vec3().copy(current.position).add(move.delta),
        false
      );
    }
  });
}
