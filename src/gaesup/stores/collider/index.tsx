import { atom, useAtom } from 'jotai';

export type colliderAtomType = {
  halfHeight: number;
  height: number;
  radius: number;
  diameter: number;
};

export const colliderAtom = atom<colliderAtomType>({
  height: 0.7,
  halfHeight: 0.35,
  radius: 0.3,
  diameter: 0.6
});
colliderAtom.debugLabel = 'collider';

export function useColliderInit() {
  const [collider, setcollider] = useAtom(colliderAtom);
  return { collider, setcollider };
}