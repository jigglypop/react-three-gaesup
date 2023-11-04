import { createSprinkles } from '@vanilla-extract/sprinkles';

import { colorProperties } from './color.css';
import { gridProperties } from './grid.css';
import { directionProperties } from './direction.css';
import { displayProperties } from './display.css';
import { marginProperties } from './margin.css';
import { paddingProperties } from './padding.css';
import { positionProperties } from './position.css';
import { fontSizeProperties } from './fontSize.css';

export const sprinkles = createSprinkles(
  colorProperties,
  directionProperties,
  displayProperties,
  gridProperties,
  marginProperties,
  paddingProperties,
  positionProperties,
  fontSizeProperties
);
