type CreateArrayFromNumber<
    N extends number,
    Result extends unknown[] = [],
> = Result['length'] extends N
    ? Result
    : CreateArrayFromNumber<N, [...Result,1]>

type NumericRange<
   A extends number[],
   E extends number,
   Result extends number=never
> = A['length'] extends E
   ? Result | E
   : NumericRange<[...A,1], E, Result | A['length']>

export declare type TwentyToFortyEight = NumericRange<CreateArrayFromNumber<20>,49>

export declare type MaterialSymbolsVariant = 'outlined' | 'rounded' | 'sharp'

export declare type MaterialSymbolsOptions = {
  variant?: MaterialSymbolsVariant
  includeHTML?: boolean | string | string[]
  copyHTML?: boolean | string | string[]
  styling?: Partial<StylingOptions>,
  tagName?: string,
  // array of elements you want the innerhtml replaced by the svg
  elements: string[]
}

export declare type StylingOptions = {
  size: TwentyToFortyEight,
  weight: 100 | 200 | 300 | 400 | 500 | 600 | 700,
  fill: 0 | 1,
  GRAD: -25 | 0 | 200
}

export declare type BaseOptions = {
  variant: MaterialSymbolsVariant
  // goes trough all html files from defined bundle.output.dir or pass globpattern
  includeHTML: boolean | string | string[]
  // copy all html files from bundle.input.dir to bundle.output.dir or pass a globpattern
  copyHTML: boolean | string | string[]
  styling: StylingOptions
}