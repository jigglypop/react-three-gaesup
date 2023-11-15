import { optionsAtom } from '@gaesup/stores/options';
import { useAtomValue } from 'jotai';
import JoyStick from './joystick';
import JumpPoint from './jumpPoint';
import KeyBoardToolTip from './keyBoardToolTip';
import MiniMap from './minimap';

export default function GaeSupTools({
  keyboardMap
}: {
  keyboardMap: { name: string; keys: string[] }[];
}) {
  const options = useAtomValue(optionsAtom);
  return (
    <>
      {options.controllerType === 'joystick' && <JoyStick />}
      {options.minimap && <MiniMap />}
      {options.controllerType === 'keyboard' && (
        <KeyBoardToolTip keyboardMap={keyboardMap} />
      )}
      <JumpPoint />
    </>
  );
}
