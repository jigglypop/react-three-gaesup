import { optionType } from '../type';

export const capsuleDefault = {
  halfHeight: 0.35,
  radius: 0.3
};

export const calcDefault = {
  maxV: 2.5,
  turnV: 0.2,
  turnS: 15,
  jumpV: 4,
  dragDamp: 0.15,
  ATimeD: 10,
  rejectV: 4,
  runR: 2,
  runJumpR: 1.2,
  slopJumpR: 0.25,
  jumpToG: 5,
  airDrag: 0.2,
  camFollow: 11
};

export const stabilizeDefault = {
  strength: 0.3,
  damping: {
    rotational: 0.03,
    vertical: 0.02
  }
};

export const cameraDefault = {
  initDistance: -5,
  maxDistance: -7,
  minDistance: -0.7,
  initDirection: 0,
  collisionOff: 0.7
};

export const buoyancyDefault = {
  distance: capsuleDefault.radius + 0.3,
  K: 1.2,
  damp: 0.08
};

export const rayDefault = {
  originOffset: { x: 0, y: -capsuleDefault.halfHeight, z: 0 },
  hitForgiveness: 0.1,
  length: capsuleDefault.radius + 2,
  dir: { x: 0, y: -1, z: 0 },
  ray: null,
  isSlope: false
};

export const slopeDefault = {
  maxAngle: 1, // in rad
  upExtraForce: 0.1,
  downExtraForce: 0.2,
  rayOriginOffset: capsuleDefault.radius - 0.03,
  rayLength: capsuleDefault.radius + 3,
  rayDir: { x: 0, y: -1, z: 0 }
};

export const optionDefault: optionType = {
  debug: false,
  controllerType: 'none'
};
