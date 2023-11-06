import { useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { currentAtom } from './current';

/**
 * Follow camera initial setups from props
 * Load camera pivot and character move preset
 * 카메라 초기 설정
 * 카메라 피벗과 캐릭터 이동 설정
 */
export default function initSetting() {
  const current = useAtomValue(currentAtom);

  useEffect(() => {
    current.euler.y = Math.PI;
    // Initialize camera facing direction
  }, []);
}
