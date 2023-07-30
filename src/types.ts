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
   * Variant of the symbol icons.
   */
  variant?: 'outlined' | 'rounded' | 'sharp';
  /**
   * Styles of the symbol icons.
   */
  styling?: Partial<StylingOptions>;
  /**
   * Maybe we could remove that? and force a name instead.
   */
  tagName?: string;
  /**
   * Files to replace inline icons in.
   * Defaults to ['*\*\/*.js']
   */
  include: string[];
  /**
   * Files to replace inline icons in.
   *
   * @default []
   */
  exclude: string[];
  /**
   * The elements to allow inlining icons in.
   * E.g. `<md-icon>`
   *
   * @default []
   */
  elements: string[];
};

export declare type StylingOptions = {
  size: TwentyToFortyEight;
  weight: 100 | 200 | 300 | 400 | 500 | 600 | 700;
  fill: 0 | 1;
  GRAD: -25 | 0 | 200;
};
