'use client';
import '@styles/global.css';
import Providers from '@util/provider/Providers';
import { useAtomsDebugValue } from 'jotai-devtools';
import React from 'react';

const DebugAtoms = () => {
  useAtomsDebugValue();
  return null;
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <link rel='shortcut icon' href='/images/favicon.ico' />
      <body>
        <Providers>
          <DebugAtoms />
          {children}
        </Providers>
      </body>
    </html>
  );
}
