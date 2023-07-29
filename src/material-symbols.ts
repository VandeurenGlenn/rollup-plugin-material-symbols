import {constants, cp, readFile, writeFile} from 'fs/promises'
import { join, parse } from 'path'
import { globbySync } from 'globby'
import { MaterialSymbolsOptions } from './types.js'
import { baseOptions } from './constants.js'
import { env } from 'process'
import { accessSync } from 'fs'

const createTagNameRegex = (tagName: string) =>
  new RegExp(`(?:\\@${tagName}\\-)([aA-zZ]+)`, 'g')

const injectSymbols = (content, symbols, options) => { 
  if (options.tagName) {
    const regex = createTagNameRegex(options.tagName)
    content = content.replaceAll(regex, (_, $1) => symbols[$1])    
  }

  if (options.elements) {
    for (const element of options.elements) {
      const regex = new RegExp(`(?!\\<${element}\\>)([aA-zZ]+)(?=\\<\\/${element}\\>)`, 'g')
      content = content.replaceAll(regex, (_, $1) => symbols[$1])
    }
  }
  return content
}

const getSymbols = (content, options) => {
  let matches = []
  if (options.tagName) {
    const regex = new RegExp(`(?:\\@${options.tagName}\\-)([aA-zZ]+)`, 'g')
    const _matches = content.match(regex)?.map(match => match.replace(`@${options.tagName}-`, '')) || []
    if (_matches?.length > 0) matches = _matches
  }
  if (options.elements) {
    for (const element of options.elements) {
      const regex = new RegExp(`(?!\\<${element}\\>)([aA-zZ]+)(?=\\<\\/${element}\\>)`, 'g')
      const _matches = content.match(regex)
      if (_matches?.length > 0) matches = [..._matches, ...matches]
    }
  }
  return matches
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

  const transform = async (code: string, options) => {
    for (const symbol of getSymbols(code, options)) {
      if (!symbols.includes(symbol)) {
        symbols.push(symbol)
        includedSymbols[symbol] = await readFile(createPath(root, symbol, options.styling.fill))
      }
    }
    return injectSymbols(code, includedSymbols, options)
  }

  return {
    name: 'materialSymbols',
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
            code = await transform(code, options)
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
          code = await transform(code, options)
          writeFile(path.replace(inputDir, bundleOptions.dir), code)
        }))
      }
    }
  
  }
}
export {materialSymbolsSvg}

export default materialSymbolsSvg