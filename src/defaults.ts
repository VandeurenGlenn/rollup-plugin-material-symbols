import type {MaterialSymbolsOptions, StylingOptions} from './types.js';

export const baseStylingOptions: StylingOptions = {
  size: 48,
  weight: 400,
  fill: 0,
  GRAD: 0,
};

export const baseOptions: Omit<MaterialSymbolsOptions, 'elements'> = {
  variant: 'outlined',
  include: ['**/*.js'],
  exclude: [],
  styling: baseStylingOptions,
};
