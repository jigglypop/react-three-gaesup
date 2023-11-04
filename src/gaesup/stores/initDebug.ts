import { useContext, useMemo } from 'react';
import { ControllerContext } from './context';
import { useControls } from 'leva';
import * as THREE from 'three';
import { optionAtom } from './options';
import { useAtom } from 'jotai';

export default function initDebug() {
  const [options, setOptions] = useAtom(optionAtom);
  const controllerContext = useContext(ControllerContext);

  if (options.debug) {
    Object.keys(controllerContext).forEach((key) => {
      const values = controllerContext[key];

      Object.entries(values).forEach(([k, v]) => {
        if (typeof v === 'number') {
          const [, set] = useControls(key, () => ({
            [k]: {
              value: v
            }
          }));

          const memoSet = () =>
            useMemo(() => {
              set({
                [k]: controllerContext[key][k]
              });
            }, [controllerContext[key][k]]);
          return memoSet();
        } else if (typeof v === 'string') {
          const [, set] = useControls(key, () => ({
            [k]: {
              value: v
            }
          }));
          const memoSet = () =>
            useMemo(() => {
              set({
                [k]: controllerContext[key][k]
              });
            }, [controllerContext[key][k]]);
          return memoSet();
        } else if (typeof v === 'boolean') {
          const [, set] = useControls(key, () => ({
            [k]: {
              value: false
            }
          }));
          const memoSet = () =>
            useMemo(() => {
              set({
                [k]: controllerContext[key][k]
              });
            }, [controllerContext[key][k]]);
          return memoSet();
        } else if (v instanceof THREE.Euler) {
          const [, set] = useControls(key, () => ({
            [k]: {
              value: {
                x: 0,
                y: 0,
                z: 0
              }
            }
          }));

          const memoSet = () =>
            useMemo(() => {
              set({
                [k]: {
                  x: controllerContext[key][k]._x,
                  y: controllerContext[key][k]._y,
                  z: controllerContext[key][k]._z
                }
              });
            }, [
              controllerContext[key][k]._x,
              controllerContext[key][k]._y,
              controllerContext[key][k]._z
            ]);
          return memoSet();
        } else if (v instanceof THREE.Quaternion) {
          const [, set] = useControls(key, () => ({
            [k]: {
              value: {
                x: 0,
                y: 0,
                z: 0
              }
            }
          }));

          const memoSet = () =>
            useMemo(() => {
              set({
                [k]: {
                  x: controllerContext[key][k]._x,
                  y: controllerContext[key][k]._y,
                  z: controllerContext[key][k]._z
                }
              });
            }, [
              controllerContext[key][k]._x,
              controllerContext[key][k]._y,
              controllerContext[key][k]._z
            ]);
          return memoSet();
        } else if (v instanceof THREE.Vector3) {
          const [, set] = useControls(key, () => ({
            [k]: {
              value: {
                x: 0,
                y: 0,
                z: 0
              }
            }
          }));

          const memoSet = () =>
            useMemo(
              () =>
                set({
                  [k]: {
                    x: controllerContext[key][k].x,
                    y: controllerContext[key][k].y,
                    z: controllerContext[key][k].z
                  }
                }),
              [
                controllerContext[key][k].x,
                controllerContext[key][k].y,
                controllerContext[key][k].z
              ]
            );
          return memoSet();
        }
      });
    });
  }
}
