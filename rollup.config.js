import typescript from "@rollup/plugin-typescript";
import { autoExports } from "rollup-plugin-auto-exports";

export default [{
  input: ['src/material-symbols.ts'],
  output: [{
    dir: 'exports',
    format: 'es'
  }],
  plugins: [
    typescript(),
    autoExports({
      defaultExports: {
        ".": {
          "import": "./exports/material-symbols.js",
          "types": "./exports/material-symbols.d.ts"
        }
      }
    })
  ]
}]