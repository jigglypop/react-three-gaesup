import { currentAtom } from '@gaesup/stores/current';
import { dampingAtom } from '@gaesup/stores/damping';
import { moveAtom } from '@gaesup/stores/move';
import { rayAtom } from '@gaesup/stores/ray/atom';
import { standAtom } from '@gaesup/stores/stand';
import { statesAtom } from '@gaesup/stores/states';
import { useFrame } from '@react-three/fiber';
import { vec3 } from '@react-three/rapier';
import { useAtom, useAtomValue } from 'jotai';

export default function checkOnMovingObject() {
  /**
   * Ray detect if on rigid body or dynamic platform, then apply the linear Vocity and angular Vocity to character
   * 캐릭터가 움직이는 플랫폼 위에 있는지 감지합니다
   */
  const diCToO = vec3();
  const ray = useAtomValue(rayAtom);
  const current = useAtomValue(currentAtom);
  const damping = useAtomValue(dampingAtom);
  const stand = useAtomValue(standAtom);
  const move = useAtomValue(moveAtom);
  const [states, setStates] = useAtom(statesAtom);

  const { isNotMoving } = states;
  useFrame(() => {
    const { rayHit, rayOrigin, rayParent } = ray;
    if (rayHit && rayParent) {
      if (rayParent !== null) {
        stand.position.set(rayOrigin.x, rayOrigin.y - rayHit.toi, rayOrigin.z);
        const rayType = rayParent.bodyType();
        const rayMass = rayParent.mass();
        if ((rayType === 0 || rayType === 2) && rayMass > 0.5) {
          states.isOnMoving = true;
          diCToO.copy(current.position).sub(vec3(rayParent!.translation()));
          const moVinV = vec3(rayParent!.linvel());
          const moveAngV = vec3(rayParent!.angvel());
          const crossVector = vec3().crossVectors(moveAngV, diCToO);
          move.velocity.set(
            moVinV.x + crossVector.x,
            moVinV.y,
            moVinV.z + crossVector.z
          );

          const { dragXZ, dragY } = damping;
          if (rayType === 0) {
            if (isNotMoving) {
              move.dragForce.set(
                (current.velocity.x - move.velocity.x) * dragXZ,
                0,
                (current.velocity.z - move.velocity.z) * dragXZ
              );
            } else {
              move.dragForce.copy(move.impulse).negate();
            }
            rayParent!.applyImpulseAtPoint(
              move.dragForce,
              stand.position,
              true
            );
          }
        } else {
          states.isOnMoving = false;
          move.velocity.set(0, 0, 0);
        }
      }
    }
  });
}
