import { statesAtom } from '@gaesup/stores/states';
import { useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useAtomValue } from 'jotai';
import { RefObject } from 'react';
import usePlay from '.';
import { currentAtom } from '../current';
import { rayAtom } from '../ray/atom';

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
  // const { rays } = useContext(ControllerContext);
  const ray = useAtomValue(rayAtom);
  const current = useAtomValue(currentAtom);
  const { playIdle, playWalk, playRun, playJump, playJumpIdle, playFall } =
    usePlay({ url, outerGroupRef });
  const [_, getKeys] = useKeyboardControls();
  const { jump, run } = getKeys();
  const { isNotMoving, isMoving } = useAtomValue(statesAtom);
  useFrame(() => {
    if (jump) {
      playJump();
    } else if (isNotMoving) {
      playIdle();
    } else if (isMoving) {
      run ? playRun() : playWalk();
    }
    // else if (!isCanJump) {
    //   playJumpIdle();
    // }
    if (ray.rayHit === null && current.velocity.y < 0) {
      playFall();
    }
  });
}
