'use client';

import { minimapAtom } from '@gaesup/stores/minimap';
import { useAtomValue } from 'jotai';
import { assignInWith } from 'lodash';
import * as style from './style.css';

export default function MiniMap() {
  const minimap = useAtomValue(minimapAtom);
  return (
    <div className={style.minimap}>
      <div className={style.minimapOuter}></div>
      <div className={style.minimapInner}>
        {Object.values(minimap).map((obj, key) => {
          return (
            <div
              key={key}
              className={style.minimapObject}
              style={assignInWith({
                width: `${obj.size.x}rem`,
                height: `${obj.size.z}rem`,
                transform: `translate(${-obj.center.x}rem, ${-obj.center.z}rem)`
              })}
            >
              <div className={style.text}>{obj.text}</div>
            </div>
          );
        })}
        <div className={style.avatar} />
      </div>
    </div>
  );
}
