import { propType } from '@gaesup/type';
import accelaration from './accelaration';
import actions from './actions';
import camera from './camera';
import direction from './direction';
import impulse from './impulse';
import jump from './jump';
import stabilizing from './stabilizing';
import turn from './turn';

export default function calculation(prop: propType) {
  camera(prop);
  turn(prop);
  direction(prop);
  accelaration(prop);
  jump(prop);
  impulse(prop);
  stabilizing(prop);
  actions(prop);
}
