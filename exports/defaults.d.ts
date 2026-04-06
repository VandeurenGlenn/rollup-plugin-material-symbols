import type {MaterialSymbolsOptions, StylingOptions} from './types.js'
type ResolvedMaterialSymbolsOptions = Omit<
  Required<MaterialSymbolsOptions>,
  'tagName'
> & {
  tagName?: string
}
export declare const baseStylingOptions: StylingOptions
export declare const baseOptions: ResolvedMaterialSymbolsOptions
export {}
