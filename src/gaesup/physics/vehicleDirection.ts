// import { currentCameraAtom } from '@gaesup/stores/camera/atom';
import useCalcControl from '@gaesup/stores/control';
import { currentAtom } from '@gaesup/stores/current';
import { joyStickOriginAtom } from '@gaesup/stores/joystick';
import { propType } from '@gaesup/type';
import { V3 } from '@gaesup/utils/vector';
import { useFrame } from '@react-three/fiber';
import { vec3 } from '@react-three/rapier';
import { useAtomValue } from 'jotai';

export default function vehicleDirection(prop: propType) {
  const { rigidBodyRef, options, cameraRay, constant, move, outerGroupRef } =
    prop;
  const current = useAtomValue(currentAtom);
  const joystick = useAtomValue(joyStickOriginAtom);
  const { forward, backward, leftward, rightward } = useCalcControl(prop);
  const { controllerType } = options;

  useFrame((state, delta) => {
    if (
      !rigidBodyRef ||
      !rigidBodyRef.current ||
      !outerGroupRef ||
      !outerGroupRef.current
    )
      return null;
    const velocity = vec3(rigidBodyRef.current.linvel());
    const start = Number(backward) - Number(forward);
    const front = vec3().set(start, 0, start);
    // const side = vec3().set(Number(rightward) - Number(leftward), 0, 0);
    current.euler.y += ((Number(leftward) - Number(rightward)) * Math.PI) / 64;
    const dir = V3(
      Math.sin(current.euler.y),
      0,
      Math.cos(current.euler.y)
    ).normalize();
    const direction = vec3(front).multiply(dir).multiplyScalar(0.1);

    rigidBodyRef.current.applyImpulse(
      vec3({
        x: direction.x,
        y: 0,
        // y: velocity.y,
        z: direction.z
      }),
      false
    );

    const _position = vec3(rigidBodyRef.current.translation());

    let cameraPosition = _position.clone().add(
      dir
        .clone()
        .multiplyScalar(8)
        .add(V3(0, 1, 0))
    );

    // dir.add(V3(0, 0.2, 0));
    state.camera.position.lerp(cameraPosition, 0.2);
    state.camera.quaternion.copy(current.quat);
    state.camera.lookAt(_position); //     console.log('-------------------');
    //     console.log(current.position);
    //     console.log(reversed);
    //     console.log(current.position.add(reversed));
    //     console.log('-------------------');
    //
    //     const reversetEuler = current.euler.clone();
    //     reversetEuler.y = Math.PI + current.euler.y;
    //
    // console.log(current.position);
    // state.camera.position.lerp(current.position.clone().add(reversed), 1);
    // state.camera.rotateOnAxis(V3(0, 1, 0), current.euler.y);
    //     // rigidBodyRef.current.lockRotations(true, true);
    //     if (forward) {
    //       rigidBodyRef.current.applyImpulse(V3(0, 0, 0.1), false);
    //       // rigidBodyRef.current.setLinvel(V3(0, 0, 10), false);
    //       // const { dragDamping } = move;
    //       // rigidBodyRef.current.applyImpulse(
    //       //   V3(0, 0, 0.1).add(dragDamping.negate()),
    //       //   false
    //       // );
    //     }
    //     if (leftward) {
    //       current.euler.y += Math.PI / 8;
    //
    //       // rigidBodyRef.current.setLinvel(
    //       //   vec3(rigidBodyRef.current.linvel()).multiply(
    //       //     V3(Math.sin(Math.PI / 4), 0, Math.cos(Math.PI / 4))
    //       //   ),
    //       //   false
    //       // );
    //     }
    //     if (backward) {
    //       rigidBodyRef.current.applyImpulse(V3(0, 0, -0.1), false);
    //     }
    // cameraRay.pivot.position.lerp(
    //   vec3(rigidBodyRef.current.translation()),
    //   1 - Math.exp(-constant.cameraCamFollow * delta)
    // );
    // state.camera.quaternion.rotateTowards(current.quat, 0.1);
    // state.camera.lookAt(vec3(rigidBodyRef.current.translation()));
  });
}
