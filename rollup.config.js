import typescript from '@rollup/plugin-typescript'
import {glob} from 'fs/promises'

const input = await Array.fromAsync(glob('src/**/*.{js,ts}'))

export default [
  {
    input,
    output: [
      {
        dir: 'exports',
        format: 'es'
      }
    ],
    plugins: [typescript()]
  }
]
