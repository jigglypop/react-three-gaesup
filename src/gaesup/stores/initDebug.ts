import { propType } from '@gaesup/type';
import { useControls } from 'leva';

export default function initDebug(prop: propType) {
  /**
   * Debug settings
   */
  const tempProp = { ...prop };

  // Character jumpConst
  if (prop.options.debug) {
    tempProp.constant = useControls('constants', {
      jumpSpeed: {
        value: tempProp.constant.jumpSpeed,
        min: 1,
        max: 10,
        step: 0.01
      },
      jumpAccelY: {
        value: tempProp.constant.jumpAccelY,
        min: 0,
        max: 80,
        step: 0.01
      },
      turnSpeed: {
        value: tempProp.constant.turnSpeed,
        min: 5,
        max: 30,
        step: 0.01
      },
      rejectSpeed: {
        value: tempProp.constant.rejectSpeed,
        min: 0,
        max: 10,
        step: 0.01
      },
      splintSpeed: {
        value: tempProp.constant.splintSpeed,
        min: 1,
        max: 5,
        step: 0.01
      },
      runRate: {
        value: tempProp.constant.runRate,
        min: 1,
        max: 10,
        step: 0.01
      },
      dT: {
        value: tempProp.constant.dT,
        min: 1,
        max: 100,
        step: 0.01
      },
      reconsil: {
        value: tempProp.constant.reconsil,
        min: 0,
        max: 1,
        step: 0.01
      },
      rotational: {
        value: tempProp.constant.rotational,
        min: 0,
        max: 1,
        step: 0.01
      },
      vertical: {
        value: tempProp.constant.vertical,
        min: 0,
        max: 1,
        step: 0.01
      },
      airDamping: {
        value: tempProp.constant.airDamping,
        min: 0,
        max: 1,
        step: 0.01
      },
      springConstant: {
        value: tempProp.constant.springConstant,
        min: 1,
        max: 10,
        step: 0.01
      }
    });
  }

  return { ...tempProp };
}
