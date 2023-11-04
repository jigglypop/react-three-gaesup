import { createContext } from 'react';
import { ControllerDefault } from './usePropsInit';

export type controllerContextType = typeof ControllerDefault;

export const ControllerContext = createContext(ControllerDefault);
