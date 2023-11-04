import { post } from '@components/post/style.css';
import { palette } from '@styles/constants/palette.css';
import { recipe } from '@vanilla-extract/recipes';

export const visible = recipe({
  base: {
    selectors: {
      // [`${post} > em`]: {
      //   color: 'red !important'
      // }
    }
  },
  variants: {
    
  }
});
