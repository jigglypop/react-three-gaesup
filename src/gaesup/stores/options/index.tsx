import { atom, useAtom } from 'jotai';
import { optionType } from '../../type';

export const optionAtom = atom<optionType>({
  debug: false,
  controllerType: 'none'
});

const optionAsyncAtom = atom(
  (get) => {
    get(optionAtom);
  },
  async (get, set, optionProp?: optionType) => {
    const option = get(optionAtom);
    if (optionProp === null || optionProp === undefined) return;
    set(optionAtom, {
      debug: optionProp.debug !== null ? optionProp.debug : option.debug,
      controllerType: optionProp.controllerType || 'none'
    });
  }
);

optionAtom.debugLabel = 'option';
optionAsyncAtom.debugPrivate = true;

export default function useOptionInit({
  optionProp
}: {
  optionProp?: optionType;
}) {
  const [option, setOption] = useAtom(optionAsyncAtom);
  optionAsyncAtom.onMount = (set) => {
    set(optionProp);
  };
  return { option, setOption };
}
