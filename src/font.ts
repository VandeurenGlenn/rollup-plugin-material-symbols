import {cp, readFile, writeFile} from 'fs/promises'
import { join, parse } from 'path'
import { GlobbyFilterFunction, globby, globbySync } from 'globby'
import { MaterialSymbolsOptions } from './lib/types.js'
import { GH_BASE_URL, baseOptions, variants } from './lib/constants.js'
import { injectSymbols, replaceSymbolsLinkTag, replaceSymbolsTag } from './lib/helpers/font.js'

let _codepoints
let _fetchedVariant


const materialSymbolsFont = async (options: MaterialSymbolsOptions) => {
  options = {...baseOptions, ...options}
  
  const includedSymbols = {}
  const symbols = []
  const codepoints = {}
  
  const variant = options.variant
  const shouldCopy = Boolean(options.copyHTML)
  const shouldInclude = Boolean(options.includeHTML)
  const hasCustomTheme = Boolean(options.customTheme)

  const url = `${GH_BASE_URL}MaterialSymbols${variant}[FILL,GRAD,opsz,wght].codepoints`

  if (!_codepoints || _fetchedVariant !== variant) {
    _fetchedVariant = variant
    _codepoints = (await (await fetch(url)).text()).split('\n')
    for (const line of _codepoints) {
      const parts = line.split(' ')
      codepoints[parts[0]] = parts[1]
    }
  }

  let inputDir

  return {
    name: 'materialSymbols',
    buildStart: (options) => {
      const input = Array.isArray(options.input) ? options.input[0] : options.input
      if (shouldCopy) inputDir = parse(input).dir
    },
    transform: async (code, id) => {
      // replaces @symbol-home with the codepoint for home
      return injectSymbols(code, codepoints, symbols)
    },
    writeBundle: async (bundleOptions, bundle) => {
      for (const symbol of symbols) {
        includedSymbols[symbol] = codepoints[symbol]
      }
      if (shouldCopy) {
        const copyHTML = options.copyHTML === true ? `${inputDir}/**/*.html` : options.copyHTML
        const glob = globbySync(copyHTML as string)
        
        await Promise.all(glob.map(path => cp(path, join(bundleOptions.dir, path.replace(inputDir, '')))))

        if (shouldInclude) {
          const promises = await Promise.all(glob.map(async path => 
            {
              let code = (await readFile(path.replace(inputDir, bundleOptions.dir))).toString()
              return { code: injectSymbols(code, codepoints, symbols), path }
            }
          ))
          
          for (const symbol of symbols) {
            includedSymbols[symbol] = codepoints[symbol]
          }

          await Promise.all(promises.map(({code, path}) =>
            {
              code = replaceSymbolsLinkTag(code, includedSymbols, variant, options.styling)
              code = replaceSymbolsTag(code, includedSymbols)
              return writeFile(path.replace(inputDir, bundleOptions.dir), code)
            }
          ))
        }
      }
      // also run trough html when not copying
      if (!shouldCopy && shouldInclude) {
        const includeHTML = options.includeHTML === true ? `${bundleOptions.dir}/**/*.html` : options.includeHTML
        const glob = globbySync(includeHTML as string)

        const promises = await Promise.all(glob.map(async path => 
          {
            let code = (await readFile(path)).toString()
            code = injectSymbols(code, codepoints, symbols)
            return { path, code }
          }
        ))
        for (const symbol of symbols) {
          includedSymbols[symbol] = codepoints[symbol]
        }

        await Promise.all(promises.map(({code, path}) =>
            {
              code = replaceSymbolsLinkTag(code, includedSymbols, variant, options.styling)
              code = replaceSymbolsTag(code, includedSymbols)
              return writeFile(path.replace(inputDir, bundleOptions.dir), code)
            }
          ))
      }

      if (hasCustomTheme) {
        const customTheme = options.customTheme === true ? `${bundleOptions.dir}/theme.js` : options.customTheme
        let code = (await readFile(customTheme as string)).toString()
        code = replaceSymbolsLinkTag(code, includedSymbols, variant, options.styling)
        code = replaceSymbolsTag(code, includedSymbols)
        await writeFile(customTheme as string, code)
      }
    }
  
  }
}
export {materialSymbolsFont}
export default materialSymbolsFont