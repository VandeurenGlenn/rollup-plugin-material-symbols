import type {MaterialSymbolsOptions, StylingOptions} from './types.js';

export const baseStylingOptions: StylingOptions = {
  variant: 'outlined',
  size: 48,
  weight: 400,
  fill: 0,
  grade: 0,
};

export const baseOptions: Partial<MaterialSymbolsOptions> = {
  include: ['**/*.js'],
  exclude: [],
  styling: baseStylingOptions,
  placeholderPrefix: '@md_symbol_',
};
