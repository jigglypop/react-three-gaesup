import { persent, rem, size } from '@styles/constants/constant.css';
import { defineProperties } from '@vanilla-extract/sprinkles';

const properties = { ...persent, ...size, ...rem };

export const paddingProperties = defineProperties({
  conditions: {
    mobile: {},
    tablet: { '@media': '(min-width: 768px)' },
    laptop: { '@media': '(min-width: 1024px)' },
    desktop: { '@media': '(min-width: 1440px)' }
  },
  defaultCondition: 'mobile',
  properties: {
    padding: properties,
    paddingBottom: properties,
    paddingTop: properties,
    paddingLeft: properties,
    paddingRight: properties
  },
  shorthands: {
    p: ['padding'],
    pb: ['paddingBottom'],
    pt: ['paddingTop'],
    pl: ['paddingLeft'],
    pr: ['paddingRight'],
    pX: ['paddingLeft', 'paddingRight'],
    pY: ['paddingTop', 'paddingBottom']
  }
});
