import { useFrame } from '@react-three/fiber';
import { RapierRigidBody, vec3 } from '@react-three/rapier';
import { RefObject, useContext } from 'react';
import { ControllerContext } from '../stores/context';
import { statesAtom } from '@gaesup/stores/states';
import { useAtomValue } from 'jotai';

export default function calcJump({
  rigidBodyRef,
  outerGroupRef
}: {
  rigidBodyRef: RefObject<RapierRigidBody>;
  outerGroupRef: RefObject<THREE.Group>;
}) {
  const { cur, jumps, calc, control, slope, rays, stand } =
    useContext(ControllerContext);
  const { isCanJump } = useAtomValue(statesAtom);

  useFrame(() => {
    // Jump impulse
    // 점프 충격량 계산
    if (control.jump && isCanJump) {
      jumps.Vv3.set(
        cur.V.x,
        control.run ? calc.runJumpR * calc.jumpV : calc.jumpV,
        cur.V.z
      );
      // Apply slope normal to jump direction
      // 경사면의 법선을 점프 방향에 적용합니다
      if (slope.currentV3) {
        const { x, y, z } = slope.currentV3;
        rigidBodyRef.current!.setLinvel(
          jumps.Di.set(
            0,
            (control.run ? calc.runJumpR * calc.jumpV : calc.jumpV) *
              calc.slopJumpR,
            0
          )
            .projectOnVector(vec3().set(x, y, z))
            .add(jumps.Vv3),
          false
        );
      }
      // Apply jump force downward to the standing platform
      // 캐릭터가 서있는 플랫폼에 아래쪽으로 점프 힘을 가합니다
      rays.mass.y *= calc.jumpToG;
      rays.rayParent?.applyImpulseAtPoint(rays.mass, stand.P, true);
    }
  });
}
