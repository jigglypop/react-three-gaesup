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

export const gameBoy = style([
  fixed({
    south: true
  }),
  flex({
    column: '6'
  }),
  {
    width: '100%'
  }
]);

export const gameBoyInner = style([
  grid({
    row: 'center'
  }),
  {
    margin: '1rem',
    padding: '2rem',
    borderRadius: '50%',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridTemplateRows: '1fr 1fr 1fr',
    background: 'rgba(0, 0, 0, 0.5)',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)'
  }
]);

export const gameBoyButtonRecipe = recipe({
  base: [
    flex_relative({}),
    glass({}),
    {
      all: 'unset',
      width: '4rem',
      height: '4rem',
      margin: '0.3rem',
      borderRadius: '50%',
      background: vars.gradient.green,
      boxShadow: '0 0 10px #78ffd6',
      fontSize: '1.6rem',
      color: 'black',
      textShadow: '0 0 10px black',
      cursor: 'pointer',
      transition: 'all 0.3s ease-in'
      // animation: `0.3s ${keyFramesClickHello} infinite`
    }
  ],
  variants: {
    tag: {
      up: {
        gridRow: '1/2',
        gridColumn: '2/3'
      },
      left: {
        gridRow: '2/3',
        gridColumn: '1/2'
      },
      down: {
        gridRow: '3/4',
        gridColumn: '2/3'
      },
      right: {
        gridRow: '2/3',
        gridColumn: '3/4'
      }
    }
  }
});
