import materialSymbols from './../lib/material-symbols.js';

export default [
  {
    input: ['src/svg/icon.js'],
    output: [
      {
        dir: 'exports/svg',
        format: 'es',
      },
    ],
    plugins: [
      materialSymbols({
        tagName: 'symbol',
        elements: ['md-icon', 'custom-icon'],
      }),
    ],
  },
];
