import type {BaseOptions, StylingOptions} from './types.js';

export const baseStylingOptions: StylingOptions = {
  size: 48,
  weight: 400,
  fill: 0,
  GRAD: 0,
};

export const baseOptions: BaseOptions = {
  variant: 'outlined',
  includeHTML: true,
  copyHTML: true,
  styling: baseStylingOptions,
};
