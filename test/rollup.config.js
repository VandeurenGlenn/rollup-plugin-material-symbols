import materialSymbols from './../exports/material-symbols.js'

export default [{
  input: ['src/svg/icon.js'],
  output: [{
    dir: 'exports/svg',
    format: 'es'
  }],
  plugins: [
    materialSymbols({
      styling: {weight: 700}
    })
  ]
}]