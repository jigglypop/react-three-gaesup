import { useFrame } from '@react-three/fiber';
import { vec3 } from '@react-three/rapier';
import { useContext } from 'react';
import { ControllerContext } from '../stores/context';
import { Object3D, Object3DEventMap } from 'three';

/**
 * Camera movement
 * 카메라 이동
 * @param props.pivot : camera pivot
 * @param props.cameraCollisionDetect : camera collision detect
 * @returns void
 *
 */
export default function calcCamera({
  pivot,
  cameraCollisionDetect
}: {
  pivot: Object3D<Object3DEventMap>;
  cameraCollisionDetect: (delta: number) => void;
}) {
  const { capsule, cur, calc } = useContext(ControllerContext);
  useFrame((state, delta) => {
    pivot.position.lerp(
      vec3({
        x: cur.P.x,
        y: cur.P.y,
        z: cur.P.z
      }),
      1 - Math.exp(-calc.camFollow * delta)
    );
    state.camera.lookAt(pivot.position);

    /**
     * Camera collision detect
     * 카메라 충돌 감지
     * @param delta
     */
    cameraCollisionDetect(delta);
  });
}
