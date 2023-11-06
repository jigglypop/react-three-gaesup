import { currentAtom } from '@gaesup/stores/current';
import { jumpAtom } from '@gaesup/stores/jump';
import { ratioAtom } from '@gaesup/stores/ratio';
import { rayAtom } from '@gaesup/stores/ray/atom';
import { slopeRayAtom } from '@gaesup/stores/slopRay/atom';
import { standAtom } from '@gaesup/stores/stand';
import { useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { RapierRigidBody, vec3 } from '@react-three/rapier';
import { useAtomValue } from 'jotai';
import { RefObject } from 'react';

export default function calcJump({
  rigidBodyRef
}: {
  rigidBodyRef: RefObject<RapierRigidBody>;
}) {
  const ratio = useAtomValue(ratioAtom);
  const ray = useAtomValue(rayAtom);
  const slopeRay = useAtomValue(slopeRayAtom);
  const current = useAtomValue(currentAtom);
  const stand = useAtomValue(standAtom);
  const [_, getKeys] = useKeyboardControls();
  const { jump: isOnJump, run } = getKeys();
  const jump = useAtomValue(jumpAtom);
  // const { isCanJump } = useAtomValue(statesAtom);
  useFrame(() => {
    // Jump impulse
    if (isOnJump) {
      jump.velocity.set(
        current.velocity.x,
        run ? ratio.runJump * jump.speed : jump.speed,
        current.velocity.z
      );
      // Apply slope normal to jump direction
      if (slopeRay.current) {
        const { x, y, z } = slopeRay.current;
        rigidBodyRef.current!.setLinvel(
          jump.direction
            .set(
              0,
              (run ? ratio.runJump * jump.speed : jump.speed) * ratio.slopJump,
              0
            )
            .projectOnVector(vec3({ x, y, z }))
            .add(jump.velocity),
          false
        );
      }
      // Apply jump force downward to the standing platform
      ray.mass.y *= jump.gravity;
      ray.rayParent?.applyImpulseAtPoint(ray.mass, stand.position, true);
    }
  });
}
