import {materialSymbols} from './../exports/material-symbols.js'
export default [{
  input: ['src/icon.js'],
  output: [{
    dir: 'exports',
    format: 'es'
  }],
  plugins: [
    materialSymbols({
      includeHTML: true, // ./exports/**/*.html
      copyHTML: true, // './src/**/*.html'
      customTheme: false
    })
  ]
}]