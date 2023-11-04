'use client';
import React from 'react';
import '@styles/global.css';
import localFont from 'next/font/local';
import { Do_Hyeon, Noto_Sans_KR, Open_Sans, Roboto } from 'next/font/google';
import Providers from '@util/provider/Providers';
import { useAtomsDebugValue } from 'jotai-devtools';

export const nanumSquare = localFont({
  src: [
    { path: './fonts/NanumSquareL.ttf', weight: '300' },
    { path: './fonts/NanumSquareR.ttf', weight: '400' },
    { path: './fonts/NanumSquareB.ttf', weight: '700' },
    { path: './fonts/NanumSquareEB.ttf', weight: '800' }
  ],
  variable: '--nanum-square',
  display: 'swap'
});

export const blackHanSans = localFont({
  src: [
    { path: './fonts/BlackHanSans-Regular.ttf', weight: '400' },
    { path: './fonts/BlackHanSans-Regular.ttf', weight: '700' }
  ],
  variable: '--black-han-sans',
  display: 'swap'
});

export const doHyun = Do_Hyeon({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--do-hyun'
});

export const notoSans = Noto_Sans_KR({
  subsets: ['latin'],
  weight: '300'
});

export const roboto = Roboto({
  subsets: ['latin'],
  weight: '400',
  variable: '--roboto'
});

export const open_Sans = Open_Sans({
  subsets: ['latin'],
  weight: '600'
});

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
    <html className={`${nanumSquare.className}`} lang='ko'>
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
