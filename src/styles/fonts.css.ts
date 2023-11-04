import { globalFontFace } from '@vanilla-extract/css';
import localFont from 'next/font/local';

export const nanumSquareVE = 'nanumSquareVE';
export const firaMono = '"Fira Mono", monospace';
export const robotoMono = '"Roboto Mono", monospace';
export const nanumBarunGothicVE = 'NaunmBarunGothic';
export const nanumBarunGothicBoldVE = 'NaunmBarunGothicBold';
export const nanumBarunGothicLightVE = 'NaunmBarunGothicLight';
export const nanumBarunGothicUltraLightVE = 'NaunmBarunGothicUltraLight';
export const blackHanSansVE = `"Black Han Sans", sans-serif`;
export const nanumGodicVE = `'Nanum Gothic', sans-serif`;
export const nanumGodicBoldVE = `'Nanum Gothic', sans-serif`;
export const nanumGodicExtraBoldVE = `'Nanum Gothic', sans-serif`;

// globalFontFace(nanumGodicVE, {
//   src: `url('https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap')`
// });
//
// globalFontFace(nanumGodicBoldVE, {
//   src: `url('https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@700&display=swap')`
// });
//
// globalFontFace(nanumGodicExtraBoldVE, {
//   src: `url('https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@800&display=swap')`
// });
//
// globalFontFace(nanumSquareVE, {
//   src: `./fonts/NanumSquareL.ttf`
// });
//
// globalFontFace(firaMono, {
//   src: `url("https://fonts.googleapis.com/css2?family=Fira+Mono&display=swap")`
// });
//
// globalFontFace(robotoMono, {
//   src: `url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@100&display=swap')`
// });
//
// globalFontFace(blackHanSansVE, {
//   src: `url('https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Roboto+Mono:wght@100&display=swap')`
// });
//
// globalFontFace(nanumBarunGothicVE, {
//   src: `./fonts/NanumBarunGothic.ttf`
// });
//
// globalFontFace(nanumBarunGothicBoldVE, {
//   src: `./fonts/NanumBarunGothicBold.ttf`
// });
//
// globalFontFace(nanumBarunGothicLightVE, {
//   src: `./fonts/NanumBarunGothicLight.ttf`
// });
//
// globalFontFace(nanumBarunGothicUltraLightVE, {
//   src: `./fonts/NanumBarunGothicUltraLight.ttf`
// });
//
// export const nanumSquare = localFont({
//   src: './fonts/NanumSquareL.ttf',
//   weight: '200',
//   display: 'swap'
// });

export const nanumBarunGothic = localFont({
  src: './fonts/NanumBarunGothic.ttf'
});

export const nanumBarunGothicBold = localFont({
  src: './fonts/NanumBarunGothicBold.ttf'
});

export const nanumBarunGothicLight = localFont({
  src: './fonts/NanumBarunGothicLight.ttf'
});

export const nanumBarunGothicUltraLight = localFont({
  src: './fonts/NanumBarunGothicUltraLight.ttf'
});
