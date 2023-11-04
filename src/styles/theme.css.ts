import {
  createGlobalTheme,
  createTheme,
  createThemeContract
} from '@vanilla-extract/css';
import { palette } from './constants/palette.css';

const root = createGlobalTheme(':root', {
  fonts: {
    heading: 'Georgia, Times, Times New Roman, serif'
    // body: 'NanumSquareL, sans-serif'
  },
  gradient: {
    purple: 'linear-gradient(45deg,#8e2de2, #4a00e0)',
    bluePurple:
      'radial-gradient( circle farthest-corner at 11.7% 80.6%,  rgba(249,185,255,1) 0%, rgba(177,172,255,1) 49.3%, rgba(98,203,255,1) 89% );',
    green:
      'linear-gradient( 68.4deg,  rgba(99,251,215,1) -0.4%, rgba(5,222,250,1) 100.2% );',
    red: 'linear-gradient( 68.3deg,  rgba(245,177,97,1) 0.4%, rgba(236,54,110,1) 100.2% );',
    pink: 'radial-gradient( circle farthest-corner at 10.2% 55.8%,  rgba(252,37,103,1) 0%, rgba(250,38,151,1) 46.2%, rgba(186,8,181,1) 90.1% );'
  }
});

export const themes = createThemeContract({
  background: null,
  scrollBarTrack: null,
  comment: null,
  sunmoon: null,
  text: {
    normal: null,
    reverse: null
  },
  glass: {
    normal: null,
    reverse: null
  },
  tag: null,
  code: null,
  blockquote: null,
  placeholder: null,
  textarea: null,
  debug: null,
  toc: {
    selected: null,
    notSelected: null
  }
});

export const lightTheme = createTheme(themes, {
  background: 'rgb(255, 255, 255)',
  scrollBarTrack: 'rgb(40, 46, 53)',
  comment: 'rgb(229 231 235)',
  textarea: 'rgb(229 231 235)',
  sunmoon: '#ffe44b',
  text: {
    normal: '#000000',
    reverse: '#FFFFFF'
  },
  tag: 'rgb(203, 213, 225)',
  code: 'rgb(233, 236, 239)',
  blockquote: 'rgb(250 250 250)',
  placeholder: 'rgb(75 85 99)',
  glass: {
    normal: 'rgba(229, 231, 235, 0.8)',
    reverse: 'rgba(0, 0, 0, 0.2)'
  },
  debug: 'rgba(31, 41, 55, 0.8)',
  toc: {
    selected: 'rgb(31 41 55)',
    notSelected: 'rgba(75, 85, 99, 0.8)'
  }
});

export const darkTheme = createTheme(themes, {
  background: 'rgb(13, 17, 23)',
  scrollBarTrack: 'rgb(40, 46, 53)',
  comment: 'rgb(50, 50, 50)',
  textarea: 'rgb(50, 50, 50)',
  sunmoon: '#ff594e',
  text: {
    normal: '#FFFFFF',
    reverse: '#000000'
  },
  tag: 'rgb(51 65 85)',
  code: 'rgb(54, 54, 54)',
  blockquote: 'rgb(50, 50, 50)',
  placeholder: 'rgb(75 85 99)',
  glass: {
    normal: 'rgba(0, 0, 0, 0.2)',
    reverse: 'rgba(255, 255, 255, 0.8)'
  },
  debug: 'rgba(31, 41, 55, 0.8)',
  toc: {
    selected: 'rgb(243 244 246)',
    notSelected: 'rgb(156 163 175)'
  }
});

export const vars = { ...root, themes };
