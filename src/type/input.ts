import { ChangeEvent } from 'react';

export type IInput = {
  type?: string;
  name?: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  fontSize?: string;
  value?: string;
};
