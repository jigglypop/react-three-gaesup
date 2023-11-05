import { currentAtom } from '@gaesup/stores/current';
import { ratioAtom } from '@gaesup/stores/ratio';
import { rayAtom } from '@gaesup/stores/ray/atom';
import { slopeRayAtom } from '@gaesup/stores/slopRay/atom';
import { standAtom } from '@gaesup/stores/stand';
import { useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { RapierRigidBody, vec3 } from '@react-three/rapier';
import { useAtomValue } from 'jotai';
import { RefObject, useContext } from 'react';
import { ControllerContext } from '../stores/context';

export default function calcJump({
  rigidBodyRef // outerGroupRef
}: {
  rigidBodyRef: RefObject<RapierRigidBody>;
  // outerGroupRef: RefObject<THREE.Group>;
}) {
  const { jumps, calc } = useContext(ControllerContext);
  const ratio = useAtomValue(ratioAtom);
  const ray = useAtomValue(rayAtom);
  const slopeRay = useAtomValue(slopeRayAtom);
  const current = useAtomValue(currentAtom);
  const stand = useAtomValue(standAtom);
  const [_, getKeys] = useKeyboardControls();
  const { jump, run } = getKeys();
  // const { isCanJump } = useAtomValue(statesAtom);
  useFrame(() => {
    // Jump impulse
    if (jump) {
      jumps.Vv3.set(
        current.velocity.x,
        run ? ratio.runJump * calc.jumpV : calc.jumpV,
        current.velocity.z
      );
      // Apply slope normal to jump direction
      if (slopeRay.current) {
        const { x, y, z } = slopeRay.current;
        rigidBodyRef.current!.setLinvel(
          jumps.Di.set(
            0,
            (run ? ratio.runJump * calc.jumpV : calc.jumpV) * ratio.slopJump,
            0
          )
            .projectOnVector(vec3({ x, y, z }))
            .add(jumps.Vv3),
          false
        );
      }
      // Apply jump force downward to the standing platform
      ray.mass.y *= calc.jumpToG;
      ray.rayParent?.applyImpulseAtPoint(ray.mass, stand.position, true);
    }
  });
}
