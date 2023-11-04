import { atom, useAtom } from 'jotai';

export const keyAtom = atom({
  forward: false,
  backward: false,
  leftward: false,
  rightward: false,
  jump: false,
  run: false
});
keyAtom.debugLabel = 'key';

export function useKey() {
  const [key, setKey] = useAtom(keyAtom);
  const pushKey = (tag: string, bool: boolean) => {
    setKey((key) => ({
      ...key,
      [tag]: bool
    }));
  };
  return {
    key,
    setKey,
    pushKey
  };
}