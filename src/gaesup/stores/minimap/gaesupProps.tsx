import { vec3 } from '@react-three/rapier';
import { useAtom, useAtomValue } from 'jotai';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { minimapAtom } from '.';
import { optionsAtom } from '../options';

export default function GaeSupProps({
  text,
  children
}: {
  text: string;
  children: React.ReactNode;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [minimap, setMiniMap] = useAtom(minimapAtom);
  const options = useAtomValue(optionsAtom);
  useEffect(() => {
    if (groupRef.current) {
      const box = new THREE.Box3().setFromObject(groupRef.current);
      const size = vec3(box.getSize(new THREE.Vector3()))
        .clone()
        .multiplyScalar(options.minimapRatio);
      const center = vec3(box.getCenter(new THREE.Vector3()))
        .clone()
        .multiplyScalar(options.minimapRatio);
      const obj = {
        text,
        size,
        center
      };
      setMiniMap((minimap) => ({
        ...minimap,
        [text]: obj
      }));
    }
  }, []);

  return <group ref={groupRef}>{children}</group>;
}
