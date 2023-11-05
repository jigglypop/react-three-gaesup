import { BiDownArrow } from '@react-icons/all-files/bi/BiDownArrow';
import { BiLeftArrow } from '@react-icons/all-files/bi/BiLeftArrow';
import { BiRightArrow } from '@react-icons/all-files/bi/BiRightArrow';
import { BiUpArrow } from '@react-icons/all-files/bi/BiUpArrow';
import { useAtomValue } from 'jotai';
import { optionAtom } from '../stores/options';
import GameBoyButton, { gameBoyButtonType } from './GameBoyButton';
import * as style from './style.css';

export const GameBoyDirections = [
  {
    tag: 'up',
    value: 'forward',
    icon: <BiUpArrow />
  },
  { tag: 'down', value: 'backward', icon: <BiDownArrow /> },
  { tag: 'left', value: 'leftward', icon: <BiLeftArrow /> },
  { tag: 'right', value: 'rightward', icon: <BiRightArrow /> }
  // { tag: 'z', value: 'KeyZ', icon: 'GREET' }
];

export default function GameBoy() {
  const options = useAtomValue(optionAtom);
  return (
    <>
      {options.controllerType === 'gameboy' && (
        <div className={style.joyStick}>
          <div className={style.joyStickInner}>
            {GameBoyDirections.map((item: gameBoyButtonType, key: number) => {
              return (
                <GameBoyButton
                  key={key}
                  tag={item.tag}
                  value={item.value}
                  icon={item.icon}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
