import {cp, readFile, writeFile} from 'fs/promises'
import { join, parse } from 'path'
import { GlobbyFilterFunction, globby, globbySync } from 'globby'
import { MaterialSymbolsOptions, MaterialSymbolsSvgOptions } from './lib/types.js'
import { GH_BASE_URL, baseOptions, variants } from './lib/constants.js'
import { getSymbols, injectSymbols } from './lib/helpers/svg.js'
import { env } from 'process'

let _codepoints
let _fetchedVariant

const includedSymbols = {}
  const symbols = []
const materialSymbolsSvg = async (options: MaterialSymbolsSvgOptions) => {
  options = {...baseOptions, ...options}
  
  
  const codepoints = {}
  
  const variant = options.variant.toLowerCase()
  const shouldCopy = Boolean(options.copyHTML)
  const shouldInclude = Boolean(options.includeHTML)

  const root = `${env.npm_config_local_prefix}/node_modules/@material-symbols/svg-400/${variant}`
  const createPath = (root, symbol, fill) => {
    return join(root, `${fill === 1 ? `${symbol}-fill` : symbol}.svg`)
  }
  let inputDir: string

  const transform = async (code: string) => {
    
    for (const symbol of getSymbols(code)) {
      if (!symbols.includes(symbol)) {
        symbols.push(symbol)
        includedSymbols[symbol] = await readFile(createPath(root, symbol, options.styling.FILL))
      }
    }
    return injectSymbols(code, includedSymbols)
  }

  return {
    name: 'materialSymbolsSvg',
    buildStart: (options) => {
      const input = Array.isArray(options.input) ? options.input[0] : options.input
      if (shouldCopy) inputDir = parse(input).dir
    },
    transform,
    writeBundle: async (bundleOptions, bundle) => {
      if (shouldCopy) {
        const copyHTML = options.copyHTML === true ? `${inputDir}/**/*.html` : options.copyHTML
        const glob = globbySync(copyHTML as string)
        
        await Promise.all(glob.map(path => cp(path, join(bundleOptions.dir, path.replace(inputDir, '')))))

        if (shouldInclude) {
          await Promise.all(glob.map(async path => {
            let code = (await readFile(path.replace(inputDir, bundleOptions.dir))).toString()
            code = await transform(code)
            writeFile(path.replace(inputDir, bundleOptions.dir), code)
          }))
        }
      }
      // also run trough html when not copying
      if (!shouldCopy && shouldInclude) {
        const includeHTML = options.includeHTML === true ? `${bundleOptions.dir}/**/*.html` : options.includeHTML
        const glob = globbySync(includeHTML as string)

        await Promise.all(glob.map(async path => {
          let code = (await readFile(path.replace(inputDir, bundleOptions.dir))).toString()
          code = await transform(code)
          writeFile(path.replace(inputDir, bundleOptions.dir), code)
        }))
      }
    }
  
  }
}
export {materialSymbolsSvg}

export default materialSymbolsSvg