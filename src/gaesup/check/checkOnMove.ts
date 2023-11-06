import { currentAtom } from '@gaesup/stores/current';
import { dampingAtom } from '@gaesup/stores/damping';
import { moveAtom } from '@gaesup/stores/move';
import { rayAtom } from '@gaesup/stores/ray/atom';
import { standAtom } from '@gaesup/stores/stand';
import { statesAtom } from '@gaesup/stores/states';
import { useFrame } from '@react-three/fiber';
import { vec3 } from '@react-three/rapier';
import { useAtom, useAtomValue } from 'jotai';

export default function checkOnMove() {
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
          setStates({
            ...states,
            isOnMoving: true
          });

          diCToO.copy(current.position).sub(vec3(rayParent!.translation()));
          const moVinV = vec3(rayParent!.linvel());
          const moveAngV = vec3(rayParent!.angvel());

          move.velocity.set(
            moVinV.x + move.velocityToLinev.crossVectors(moveAngV, diCToO).x,
            moVinV.y,
            moVinV.z + move.velocityToLinev.crossVectors(moveAngV, diCToO).z
          );

          if (rayType === 0) {
            if (isNotMoving) {
              move.dragForce.set(
                (current.velocity.x - move.velocity.x) * damping.drag,
                0,
                (current.velocity.z - move.velocity.z) * damping.drag
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
          setStates({
            ...states,
            isOnMoving: false
          });
          move.velocity.set(0, 0, 0);
        }
      }
    }
  });
}
