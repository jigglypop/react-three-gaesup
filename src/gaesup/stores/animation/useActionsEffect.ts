import { useFrame } from '@react-three/fiber';
import { RefObject, useContext } from 'react';
import states, { statesAtom } from '@gaesup/stores/states';
import { useAtomValue } from 'jotai';
import { ControllerContext } from '../context';
import usePlay from '.';
import { useKeyboardControls } from '@react-three/drei';

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
  const { rays, cur } = useContext(ControllerContext);
  const { playIdle, playWalk, playRun, playJump, playJumpIdle, playFall } =
    usePlay({ url, outerGroupRef });
  const [_, getKeys] = useKeyboardControls();
  const { jump, run } = getKeys();

  const { isCanJump, isNotMoving, isMoving } = useAtomValue(statesAtom);

  useFrame(() => {
    if (isNotMoving && !jump) {
      playIdle();
    } else if (jump) {
      playJump();
    } else if (isMoving) {
      run ? playRun() : playWalk();
    }
    // else if (!isCanJump) {
    //   playJumpIdle();
    // }
    if (rays.rayHit == null && cur.V.y < 0) {
      playFall();
    }
  });
}
