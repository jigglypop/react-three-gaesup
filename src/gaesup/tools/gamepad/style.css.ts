import {
  fixed,
  flex,
  flex_relative,
  glass,
  grid
} from '@styles/recipe/index.css';
import { vars } from '@styles/theme.css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const gamePad = style([
  fixed({
    south_west: true
  }),
  flex({
    column: '6'
  }),
  {
    width: '10vw',
    zIndex: 10000
  }
]);

export const gamePadInner = style([
  grid({
    column: 'center'
  }),
  {
    margin: '1rem',
    padding: '2rem'
  }
]);

export const gamePadButtonRecipe = recipe({
  base: [
    flex_relative({}),
    glass({}),
    {
      all: 'unset',
      width: '4rem',
      height: '4rem',
      margin: '0.3rem',
      borderRadius: '50%',
      background: vars.gradient.bluePurple,
      boxShadow: '0 0 10px rgba(249,185,255,1)',
      fontSize: '1rem',
      color: 'black',
      textShadow: '0 0 10px black',
      cursor: 'pointer',
      transition: 'all 0.3s ease-in'
    }
  ]
});
