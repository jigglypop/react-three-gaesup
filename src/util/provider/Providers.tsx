'use client';

import React from 'react';

import { Provider } from 'jotai';
import { DevTools } from 'jotai-devtools';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider>
      {children}
      <DevTools />
    </Provider>
  );
}
