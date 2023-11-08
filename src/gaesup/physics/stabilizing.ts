import { dampingAtom } from '@gaesup/stores/damping';
import { useFrame } from '@react-three/fiber';
import { RapierRigidBody, vec3 } from '@react-three/rapier';
import { useAtomValue } from 'jotai';
import { RefObject, useEffect } from 'react';

/**
 *
 * @param rigidBody
 * @param stabilize
 * @returns
 *
 */

export type stabilizingType = {
  rigidBodyRef: RefObject<RapierRigidBody | null>;
};

export default function stabilizing({ rigidBodyRef }: stabilizingType) {
  const damping = useAtomValue(dampingAtom);
  useFrame(() => {
    if (!rigidBodyRef || !rigidBodyRef.current) return null;
    const { reconsil, rotational, vertical } = damping;
    const rotation = rigidBodyRef.current.rotation();
    const angvel = rigidBodyRef.current.angvel();
    rigidBodyRef.current.applyTorqueImpulse(
      vec3(rotation)
        .multiplyScalar(-reconsil)
        .add(
          vec3({
            x: -rotational,
            y: -vertical,
            z: -rotational
          }).multiply(vec3(angvel))
        ),
      false
    );
  });

  useEffect(() => {
    if (rigidBodyRef.current)
      rigidBodyRef.current.setEnabledRotations(true, true, true, false);
  }, [damping]);
}
