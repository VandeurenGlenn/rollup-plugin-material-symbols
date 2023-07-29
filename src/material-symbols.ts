import {constants, cp, readFile, writeFile} from 'fs/promises'
import { join, parse } from 'path'
import { GlobbyFilterFunction, globby, globbySync } from 'globby'
import { MaterialSymbolsOptions } from './types.js'
import { baseOptions } from './constants.js'
import { env } from 'process'
import { accessSync } from 'fs'

const injectSymbols = (content, symbols) => { 
  content.replaceAll(/(?:\@symbol\-)([aA-zZ]+)/g,
    (_, $1) => symbols[$1])

  return content.replaceAll(/(?!\<md-icon\>)([aA-zZ]+)(?=\<\/md-icon\>)/g,
    (_, $1) => symbols[$1])
  }

const getSymbols = (content) => {
  const matches = content.match(/(?:\@symbol\-)([aA-zZ]+)/g)  
  return matches?.map(match => match.replace('@symbol-', '')) || []
}

const includedSymbols = {}
const symbols = []

const materialSymbolsSvg = async (options: MaterialSymbolsOptions) => {
  options = {...baseOptions, ...options}
  
  const variant = options.variant.toLowerCase()
  const shouldCopy = Boolean(options.copyHTML)
  const shouldInclude = Boolean(options.includeHTML)

  const root = `${env.npm_config_local_prefix}/node_modules/@material-symbols/svg-${options.styling.weight}`

  const createPath = (root, symbol, fill) => {
    return join(join(root, variant), `${fill === 1 ? `${symbol}-fill` : symbol}.svg`)
  }

  try {
    accessSync(root, constants.R_OK)
  } catch {
    throw new Error(`nothing found for @material-symbols/svg-${options.styling.weight}.
    note: you need to manually import`)
  }

  let inputDir: string

  const transform = async (code: string) => {
    
    for (const symbol of getSymbols(code)) {
      if (!symbols.includes(symbol)) {
        symbols.push(symbol)
        includedSymbols[symbol] = await readFile(createPath(root, symbol, options.styling.fill))
      }
    }
    return injectSymbols(code, includedSymbols)
  }

  return {
    name: 'materialSymbols',
    buildStart: (options) => {
      const input = Array.isArray(options.input) ? options.input[0] : options.input
      if (shouldCopy) inputDir = parse(input).dir
    },
    transform,
    onLog(level, log) {
			if (level === 'warn' && log.code === 'THIS_IS_NOT_OK') {
				return this.error(log);
			}
		},
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