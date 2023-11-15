import { useKey } from 'gaesup/stores/control';
import * as style from './style.css';

export type gameBoyButtonType = {
  tag: 'up' | 'down' | 'left' | 'right';
  value: string;
  icon: JSX.Element;
};

export default function GameBoyButton({ tag, value, icon }: gameBoyButtonType) {
  const { pushKey } = useKey();

  const onMouseDown = () => {
    pushKey(value, true);
  };

  const onMouseLeave = () => {
    pushKey(value, false);
  };

  return (
    <button
      className={`${style.joystickButtonRecipe({
        tag: tag
      })}`}
      onMouseDown={() => onMouseDown()}
      onMouseUp={() => onMouseLeave()}
      onMouseLeave={() => onMouseLeave()}
      onContextMenu={(e) => {
        e.preventDefault();
        onMouseLeave();
      }}
    >
      {icon}
    </button>
  );
}
