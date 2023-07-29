import { BaseOptions, MaterialSymbolsVariant, StylingOptions } from "./types.js"

export const variants: MaterialSymbolsVariant[] = [
  'Outlined',
  'Rounded',
  'Sharp'
]

export const baseStylingOptions: StylingOptions = {
  opsz: 48,
  wght: 400,
  FILL: 0,
  GRAD: 0
}

export const baseOptions: BaseOptions = {
  variant: 'Outlined',
  includeHTML: undefined,
  copyHTML: undefined,
  customTheme: undefined,
  styling: baseStylingOptions
}

export const baseSvgOptions: BaseOptions = {
  variant: 'Outlined',
  includeHTML: undefined,
  copyHTML: undefined,
  styling: baseStylingOptions
}