import { currentAtom } from '@gaesup/stores/current';
import { optionsAtom } from '@gaesup/stores/options';
import { propType } from '@gaesup/type';
import { V3 } from '@gaesup/utils/vector';
import { useFrame } from '@react-three/fiber';
import { quat, vec3 } from '@react-three/rapier';
import { useAtomValue } from 'jotai';

export default function characterCamera(prop: propType) {
  const { rigidBodyRef, outerGroupRef } = prop;
  const options = useAtomValue(optionsAtom);
  const current = useAtomValue(currentAtom);

  useFrame((state) => {
    if (
      !rigidBodyRef ||
      !rigidBodyRef.current ||
      !outerGroupRef ||
      !outerGroupRef.current
    )
      return null;

    const dir = V3(
      Math.sin(current.euler.y),
      0,
      Math.cos(current.euler.y)
    ).normalize();
    let cameraPosition = vec3(rigidBodyRef.current.translation())
      .clone()
      .add(
        dir
          .clone()
          .multiplyScalar(options.orbitCamera.XZDistance)
          .multiplyScalar(options.orbitCamera.isFront ? -1 : 1)
          .add(V3(0, options.orbitCamera.YDistance, 0))
      );

    state.camera.position.lerp(cameraPosition, 0.2);
    state.camera.quaternion.copy(
      current.quat
        .clone()
        .multiply(
          options.orbitCamera.isFront
            ? quat().setFromAxisAngle(V3(0, 1, 0), Math.PI)
            : quat()
        )
    );
    state.camera.lookAt(vec3(rigidBodyRef.current.translation()));
  });
}
