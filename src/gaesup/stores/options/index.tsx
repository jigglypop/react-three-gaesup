import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';
import { optionType } from './type';

export const optionAtom = atom<optionType>({
  debug: false,
  controllerType: 'none'
});

optionAtom.debugLabel = 'option';

export default function useOptionInit({
  optionProp
}: {
  optionProp?: optionType;
}) {
  const [option, setOption] = useAtom(optionAtom);

  useEffect(() => {
    if (optionProp) {
      setOption((option) => ({
        ...option,
        ...Object.assign(option, optionProp)
      }));
    }
  }, []);
  return { option, setOption };
}
