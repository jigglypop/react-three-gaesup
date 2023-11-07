import { currentAtom } from '@gaesup/stores/current';
import { jumpAtom } from '@gaesup/stores/jump';
import { ratioAtom } from '@gaesup/stores/ratio';
import { rayAtom } from '@gaesup/stores/ray/atom';
import { slopeRayAtom } from '@gaesup/stores/slopRay/atom';
import { standAtom } from '@gaesup/stores/stand';
import { statesAtom } from '@gaesup/stores/states';
import { useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { RapierRigidBody } from '@react-three/rapier';
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
  const states = useAtomValue(statesAtom);
  // const { isCanJump } = useAtomValue(statesAtom);
  useFrame(() => {
    // Jump impulse
    if (isOnJump && states.isOnTheGround) {
      jump.velocity.set(
        current.velocity.x,
        run ? ratio.runJump * jump.speed : jump.speed,
        current.velocity.z
      );
      // Apply slope normal to jump direction
      rigidBodyRef.current!.setLinvel(
        jump.direction
          .set(
            0,
            (run ? ratio.runJump * jump.speed : jump.speed) * ratio.slopJump,
            0
          )
          .projectOnVector(slopeRay.current)
          .add(jump.velocity),
        false
      );
      // Apply jump force downward to the standing platform
      ray.mass.y *= jump.gravity;
      ray.rayParent?.applyImpulseAtPoint(ray.mass, stand.position, true);
    }
  });
}
