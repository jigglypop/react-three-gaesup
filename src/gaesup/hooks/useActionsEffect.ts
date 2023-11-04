import { useFrame } from '@react-three/fiber';
import { RefObject, useContext } from 'react';
import { ControllerContext } from '../stores/context';
import usePlay from './usePlay';
import states, { statesAtom } from '@gaesup/stores/states';
import { useAtomValue } from 'jotai';

/**
 * Actions for managing animations
 * 애니메이션을 관리하기 위한 액션들
 * @param props
 * @param props.url GLTF file url
 * @param props.outerGroupRef Ref of the outer group of the character 캐릭터의 내부 그룹의 Ref
 *
 */

export default function useActionsEffect({
  url,
  outerGroupRef
}: {
  url: string;
  outerGroupRef?: RefObject<THREE.Group>;
}) {
  const {  control, rays, cur } = useContext(ControllerContext);
  const { playIdle, playWalk, playRun, playJump, playJumpIdle, playFall } =
    usePlay({ url, outerGroupRef });

  const { isCanJump, isNotMoving, isMoving } = useAtomValue(statesAtom);

  useFrame(() => {
    const { jump, run } = control;
    if (isNotMoving && !jump) {
      playIdle();
    } else if (jump) {
      playJump();
    } else if (isMoving) {
      run ? playRun() : playWalk();
    } else if (!isCanJump) {
      playJumpIdle();
    }
    if (rays.rayHit == null && cur.V.y < 0) {
      playFall();
    }
  });
}
