import { currentAtom } from '@gaesup/stores/current';
import { vec3 } from '@react-three/rapier';
import { useAtomValue } from 'jotai';
import * as style from './style.css';

export default function JumpPoint() {
  const { refs } = useAtomValue(currentAtom);
  const { rigidBodyRef } = refs;
  const onClick = () => {
    rigidBodyRef?.current?.setTranslation(vec3().set(10, 5, 0), true);
  };

  const onClick2 = () => {
    rigidBodyRef?.current?.setTranslation(vec3().set(0, 5, 10), true);
  };
  return (
    <div className={style.jumpPoints}>
      <div className={style.jumpPoint} onClick={onClick}>
        1
      </div>
      <div className={style.jumpPoint} onClick={onClick2}>
        2
      </div>
    </div>
  );
}
