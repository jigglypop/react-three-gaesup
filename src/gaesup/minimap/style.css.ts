import { fixed, flex_absolute } from '@styles/recipe/index.css';
import { vars } from '@styles/theme.css';
import { keyframes, style } from '@vanilla-extract/css';

export const pulseWhite = keyframes({
  '0%': {
    boxShadow: '0 0 0 0 rgba(255, 255, 255, 0.7)',
    // transform: 'scale(1)'
    opacity: 1
  },
  '70%': {
    boxShadow: '0 0 0 10px rgba(255, 255, 255, 0)',
    // transform: 'scale(1)'
    opacity: 0.7
  },
  '100%': {
    boxShadow: '0 0 0 0 rgba(255, 255, 255, 0)',
    // transform: 'scale(1)'
    opacity: 1
  }
});

export const avatar = style([
  flex_absolute({
    center: true
  }),
  {
    width: '2rem',
    height: '2rem',
    borderRadius: '50%',
    background: 'rgba(5,222,250,1)',
    boxShadow: '0 0 10px rgba(5,222,250,1)',
    border: '2px solid transparent',
    objectFit: 'cover',
    zIndex: 100,
    animation: `${pulseWhite} 2s infinite`
  }
]);

export const avatarImage = style([
  {
    width: '4rem',
    height: '4rem',
    borderRadius: '50%',
    background: vars.gradient.purple,
    border: '2px solid transparent',
    objectFit: 'cover'
  }
]);

export const border = style([
  {
    width: '4rem',
    height: '4rem',
    borderRadius: '50%',
    boxShadow: '0 0 0 0 rgba(255, 255, 255, 1)',
    transform: 'scale(1)',
    animation: `${pulseWhite} 2s infinite`,
    cursor: 'pointer',
    transition: 'all 0.5s ease-in',
    selectors: {
      '&:hover': {
        transform: 'scale(1.1)'
      }
    }
  }
]);

export const toastItem = style({
  position: 'relative',
  borderRadius: '1rem',
  margin: '1rem',
  minWidth: '26rem',
  height: '6rem'
});
export const filter = style({
  position: 'absolute',
  filter: 'blur(1rem)',
  WebkitBackdropFilter: 'blur(2rem)',
  backdropFilter: 'blur(2rem)',
  width: '100%',
  height: '100%',
  borderRadius: '1rem',
  overflow: 'hidden'
});

export const minimap = style([
  fixed({
    south_east: true
  }),
  {
    margin: '2rem',
    width: '21rem',
    height: '21rem',
    borderRadius: '50%',
    background: vars.gradient.green,
    // color: 'white',
    boxShadow: `0 0 10px rgba(99,251,215,1)`,
    WebkitBackdropFilter: 'blur(10px)',
    backdropFilter: 'blur(10px)'
    // objectFit: 'cover'
  }
]);

export const minimapOuter = style([
  flex_absolute({
    center: true
  })
]);

export const minimapInner = style([
  flex_absolute({
    center: true
  }),
  {
    zIndex: 2,
    width: '20rem',
    height: '20rem',
    borderRadius: '50%',
    background: 'rgba(0, 0, 0, 0.9)',
    overflow: 'hidden'
  }
]);

export const text = style([
  {
    fontSize: '1rem',
    color: 'white',
    textShadow: '0 0 10px black'
  }
]);

export const minimapObject = style([
  flex_absolute({}),
  {
    borderRadius: '2px',
    background: 'rgba(99,251,215,0.4)',
    boxShadow: '0 0 10px rgba(99,251,215,0.4)',
    border: '2px solid rgba(99,251,215,1)',
    opacity: 0.5
  }
]);
