import { atom } from 'jotai';

export const minimapAtom = atom<THREE.Scene | null>(null);
minimapAtom.debugLabel = 'minimapAtom';
