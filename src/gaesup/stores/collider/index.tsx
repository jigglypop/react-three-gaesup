import { atom, useAtom } from 'jotai';

export type colliderAtomType = {
  halfHeight: number;
  radius: number;
};

export const colliderAtom = atom({
  halfHeight: 0.35,
  radius: 0.3
});
colliderAtom.debugLabel = 'collider';

export function useColliderInit() {
  const [collider, setcollider] = useAtom(colliderAtom);
}
