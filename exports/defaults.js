const baseStylingOptions = {
  variant: 'outlined',
  size: 48,
  weight: 400,
  fill: 0,
  grade: 0
}
const baseOptions = {
  include: ['**/*.{js,ts,html}'],
  exclude: [],
  styling: baseStylingOptions,
  placeholderPrefix: 'md_symbol',
  elements: []
}

export {baseOptions, baseStylingOptions}
