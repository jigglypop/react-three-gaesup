import { propType } from '@gaesup/type';
import airplaneDirection from './airplaneDirection';
import airplaneImpluse from './airplaneImpluse';
import camera from './camera';
import direction from './direction';
import impulse from './impulse';
import stabilizing from './stabilizing';
import turn from './turn';
import vehicleDirection from './vehicleDirection';
import vehicleImpulse from './vehicleImpulse';

export default function calculation(prop: propType) {
  camera(prop);
  turn(prop);
  // accelaration(prop);
  // jump(prop);
  if (prop.options.mode === 'normal') {
    impulse(prop);
    direction(prop);
  } else if (prop.options.mode === 'airplane') {
    airplaneImpluse(prop);
    airplaneDirection(prop);
  } else if (prop.options.mode === 'vehicle') {
    vehicleImpulse(prop);
    vehicleDirection(prop);
  }
  stabilizing(prop);
  // actions(prop);
}
