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

export declare type MaterialSymbolsVariant = 'Outlined' | 'Rounded' | 'Sharp'

export declare type MaterialSymbolsOptions = {
  variant?: MaterialSymbolsVariant
  includeHTML?: boolean | string
  copyHTML?: boolean | string[] | string,
  customTheme: boolean | string,
  styling?: StylingOptions
}

export declare type MaterialSymbolsSvgOptions = {
  variant?: MaterialSymbolsVariant
  includeHTML?: boolean | string
  copyHTML?: boolean | string[] | string,
  styling?: StylingOptions
}

export declare type StylingOptions = {
  opsz: TwentyToFortyEight,
  wght: 100 | 200 | 300 | 400 | 500 | 600 | 700,
  FILL: 0 | 1,
  GRAD: -25 | 0 | 200
}

export declare type BaseOptions = {
  variant: MaterialSymbolsVariant
  // goes trough all html files from defined bundle.output.dir or pass globpattern
  includeHTML: boolean | string
  // copy all html files from bundle.input.dir to bundle.output.dir or pass a globpattern
  copyHTML: string[] | string
  customTheme?: boolean | string,
  styling: StylingOptions
}