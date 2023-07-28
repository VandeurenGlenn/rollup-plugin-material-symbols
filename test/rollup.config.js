import {materialSymbolsSvg, materialSymbolsfont} from './../exports/material-symbols.js'
export default [{
  input: ['src/font/icon.js'],
  output: [{
    dir: 'exports/font',
    format: 'es'
  }],
  plugins: [
    materialSymbolsfont({
      includeHTML: true, // ./exports/**/*.html
      copyHTML: true, // './src/**/*.html'
      customTheme: false
    })
  ]
}, {
  input: ['src/svg/icon.js'],
  output: [{
    dir: 'exports/svg',
    format: 'es'
  }],
  plugins: [
    materialSymbolsSvg({
      includeHTML: true, // ./exports/**/*.html
      copyHTML: true, // './src/**/*.html'
      customTheme: false
    })
  ]
}]