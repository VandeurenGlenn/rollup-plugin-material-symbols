type CreateArrayFromNumber<
  N extends number,
  Result extends unknown[] = [],
> = Result['length'] extends N
  ? Result
  : CreateArrayFromNumber<N, [...Result, 1]>;

type NumericRange<
  A extends number[],
  E extends number,
  Result extends number = never,
> = A['length'] extends E
  ? Result | E
  : NumericRange<[...A, 1], E, Result | A['length']>;

export declare type TwentyToFortyEight = NumericRange<
  CreateArrayFromNumber<20>,
  49
>;

export declare type MaterialSymbolsOptions = {
  /**
   * Styles of the symbol icons.
   */
  styling: Partial<StylingOptions>;
  /**
   * Placeholders let you inline symbols when the prefix
   * is encounter.
   * For instance `@md_symbol_info` in your html will be replaced
   * by the inlined svg "info" symbol.
   *
   * @default '@md_symbol_'
   */
  placeholderPrefix: string;
  /**
   * Files to replace inline icons in.
   * Defaults to ['*\*\/*.js']
   */
  include: string[];
  /**
   * Files to exclude.
   *
   * @default []
   */
  exclude: string[];
  /**
   * The elements to allow inlining icons in.
   * E.g. `md-icon`
   *
   * @default []
   */
  elements: string[];
};

export declare type StylingOptions = {
  /**
   * Variant of the symbol icons.
   */
  variant: 'outlined' | 'rounded' | 'sharp';
  size: TwentyToFortyEight;
  weight: 100 | 200 | 300 | 400 | 500 | 600 | 700;
  fill: 0 | 1;
  grade: -25 | 0 | 200;
};
