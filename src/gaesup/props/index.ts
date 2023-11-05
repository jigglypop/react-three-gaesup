export const capsuleDefault = {
  halfHeight: 0.35,
  radius: 0.3
};

export const calcDefault = {
  maxV: 2.5,
  turnV: 0.2,
  turnS: 15,
  jumpV: 4,
  ATimeD: 10,
  rejectV: 4,
  runR: 2,
  runJumpR: 1.2,
  slopJumpR: 0.25,
  jumpToG: 5,
  dragDamp: 0.15,

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

export const buoyancyDefault = {
  distance: capsuleDefault.radius + 0.3,
  K: 1.2,
  damp: 0.08
};
