// import { atom, useAtom } from 'jotai';
// import { useEffect } from 'react';
//
//
// export default function useOptionInit({
//   optionProp
// }: {
//   optionProp?: optionType;
// }) {
//   const [option, setOption] = useAtom(optionAtom);
//
//   useEffect(() => {
//     if (optionProp) {
//       setOption((option) => ({
//         ...option,
//         ...Object.assign(option, optionProp)
//       }));
//     }
//   }, []);
//   return { option, setOption };
// }
