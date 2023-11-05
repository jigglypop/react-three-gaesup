import { currentAtom } from '@gaesup/stores/current';
import { statesAtom } from '@gaesup/stores/states';
import { useFrame } from '@react-three/fiber';
import { vec3 } from '@react-three/rapier';
import { useAtom, useAtomValue } from 'jotai';
import { useContext } from 'react';
import * as THREE from 'three';
import { ControllerContext } from '../stores/context';

export default function checkOnMove() {
  /**
   * Ray detect if on rigid body or dynamic platform, then apply the linear Vocity and angular Vocity to character
   * 캐릭터가 움직이는 플랫폼 위에 있는지 감지합니다
   */
  const diCToO = vec3();
  const { stand, rays, move, objectAng, calc } = useContext(ControllerContext);
  const current = useAtomValue(currentAtom);

  const [states, setStates] = useAtom(statesAtom);

  const { isNotMoving, isMoving } = states;
  useFrame(() => {
    const { rayHit, rayCast, rayOrigin, rayParent } = rays;
    if (rayHit && rayParent) {
      if (rayParent !== null) {
        stand.P.set(rayOrigin.x, rayOrigin.y - rayHit.toi, rayOrigin.z);
        const rayType = rayParent!.bodyType();
        const rayMass = rayParent!.mass();

        if ((rayType === 0 || rayType === 2) && rayMass > 0.5) {
          setStates({
            ...states,
            isOnMoving: true
          });

          diCToO.copy(current.position).sub(vec3(rayParent!.translation()));
          const moVinV = rayParent!.linvel() as THREE.Vector3;
          const moveAngV = rayParent!.angvel() as THREE.Vector3;
          move.V.set(
            moVinV.x + objectAng.VToLinV.crossVectors(moveAngV, diCToO).x,
            moVinV.y,
            moVinV.z + objectAng.VToLinV.crossVectors(moveAngV, diCToO).z
          );

          if (rayType === 0) {
            if (isNotMoving) {
              move.dragForce.set(
                (current.velocity.x - move.V.x) * calc.dragDamp,
                0,
                (current.velocity.z - move.V.z) * calc.dragDamp
              );
            } else {
              move.dragForce.copy(move.impulse).negate();
            }
            rayParent!.applyImpulseAtPoint(move.dragForce, stand.P, true);
          }
        } else {
          setStates({
            ...states,
            isOnMoving: false
          });
          move.V.set(0, 0, 0);
        }
      }
    }
  });
}
