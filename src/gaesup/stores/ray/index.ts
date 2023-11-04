import { RefObject, use, useCallback, useEffect, useMemo } from 'react';

import { vec3, RapierRigidBody, useRapier } from '@react-three/rapier';
import { RayColliderToi, Collider, Ray } from '@dimforge/rapier3d-compat';
import * as THREE from 'three';
import { atom, useAtom } from 'jotai';
import { rayDefault } from '../../props';
import { unwrap } from 'jotai/utils';
import { useFrame } from '@react-three/fiber';

export type rayProps = {
  springDirVec: THREE.Vector3;
  mass: THREE.Vector3;
  rayOrigin: THREE.Vector3;
  rayHit: RayColliderToi | null;
  rayParent?: RapierRigidBody | null | undefined;
  rayCast: Ray | null;
  originOffset: { x: number; y: number; z: number };
  hitForgiveness: number;
  length: number;
  dir: { x: number; y: number; z: number };
};

export const rayAtom = atom<rayProps>({
  springDirVec: vec3(),
  mass: vec3(),
  rayOrigin: vec3(),
  rayHit: null,
  rayParent: null,
  rayCast: null,
  originOffset: { x: 0, y: -1, z: 0 },
  hitForgiveness: 0.1,
  length: -1,
  dir: { x: 0, y: -1, z: 0 }
});

const rayAsyncAtom = atom(
  (get) => {
    get(rayAtom);
  },
  async (
    get,
    set,
    rayProp: typeof rayDefault,
    ref: RefObject<Collider>,
    rapierProps: ReturnType<typeof useRapier>
  ) => {
    const ray = get(rayAtom);
    const { rapier, world } = rapierProps;
    await new Promise((r) => {
      console.log('1');
      r(
        set(rayAtom, {
          ...ray,
          rayCast: new rapier.Ray(ray.rayOrigin, ray.dir)
        })
      );
    });
  }
);

rayAtom.debugLabel = 'ray';
rayAsyncAtom.debugLabel = 'rayAsync';

export default function useRayInit({
  rayProp,
  capsuleColliderRef
}: {
  rayProp: typeof rayDefault;
  capsuleColliderRef: RefObject<Collider>;
}) {
  const rapierProps = useRapier();
  const [ray, setRay] = useAtom(rayAtom);
  const { world } = useRapier();

  useEffect(() => {
    rayAsyncAtom.onMount = (set) => {
      set(rayProp, capsuleColliderRef, rapierProps);
    };
    console.log();
  }, []);

  useEffect(() => {
    console.log(ray);
  }, [ray]);

  // console.log(delayed);

  // const castRay = () => {
  //   if (!capsuleColliderRef || !capsuleColliderRef.current || !ray.rayCast)
  //     return null;
  //   return world.castRay(
  //     ray.rayCast,
  //     rayProp!.length,
  //     true,
  //     undefined,
  //     undefined,
  //     capsuleColliderRef.current
  //   );
  // };

  //   return new Promise((resolve) => {
  //     resolve(
  //
  //     );
  //   });
  //   .then(
  //   () =>
  //     new Promise((resolve) => {
  //       resolve(
  //         useCallback(
  //           () =>
  //             setRay({
  //               ...ray,
  //               // props
  //               rayHit: world.castRay(
  //                 ray.rayCast!,
  //                 rayProp.length,
  //                 true,
  //                 undefined,
  //                 undefined,
  //                 capsuleColliderRef.current!
  //               )
  //             }),
  //           [ray, setRay]
  //         )
  //       );
  //     })
  // );
  // .then(
  //   () =>
  //     new Promise((resolve) => {
  //       resolve(
  //         setRay({
  //           ...ray,
  //           // props
  //           rayParent: ray.rayHit!.collider.parent()
  //         })
  //       );
  //     })
  // );
}
