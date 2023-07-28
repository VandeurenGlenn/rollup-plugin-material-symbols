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

export const GH_BASE_URL = 'https://raw.githubusercontent.com/google/material-design-icons/master/variablefont/'
export const FONTS_BASE_URL = 'https://fonts.googleapis.com/css2?family=Material+Symbols+'