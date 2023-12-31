import { boxShadow, boxShadowHover } from '@styles/constants/boxshadow.css';
import {
  gradient,
  palette,
  rgba,
  theme,
  themeShadow,
  themeShadowHover
} from '@styles/constants/palette.css';
import { defineProperties } from '@vanilla-extract/sprinkles';

const paletteTheme = { ...palette, ...theme, ...rgba };
const paletteThemeGradient = { ...palette, ...theme, ...gradient, ...rgba };
const boxShadows = {
  ...boxShadow,
  ...boxShadowHover,
  ...themeShadow,
  ...themeShadowHover
};

export const colorProperties = defineProperties({
  conditions: {
    default: {},
    hover: { selector: '&:hover' },
    active: { selector: '&:active' },
    focus: { selector: '&:focus' }
  },
  defaultCondition: 'default',
  properties: {
    color: paletteTheme,
    backgroundColor: paletteThemeGradient,
    background: paletteThemeGradient,
    boxShadow: boxShadows,
    tranCursor: {
      true: {
        transition: 'all 0.3s ease-in',
        cursor: 'pointer'
      }
    },
    opacity: [
      '0',
      '0.1',
      '0.2',
      '0.3',
      '0.4',
      '0.5',
      '0.6',
      '0.7',
      '0.8',
      '0.9',
      '1'
    ]
  },
  shorthands: {
    bg: ['background'],
    bgc: ['backgroundColor'],
    c: ['color'],
    bs: ['boxShadow'],
    tc: ['tranCursor'],
    op: ['opacity']
  }
});
