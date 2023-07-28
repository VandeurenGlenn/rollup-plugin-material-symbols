import { FONTS_BASE_URL, baseStylingOptions } from "../constants.js"
import { MaterialSymbolsVariant, StylingOptions } from "../types.js"

export const replaceSymbolsLinkTag = (content, includedSymbols = {}, variant: MaterialSymbolsVariant, styling?: StylingOptions) => {
  const { opsz, wght, FILL, GRAD} = { ...baseStylingOptions, ...styling }

  const symbols = Object.values(includedSymbols)
    .map((value: string) =>
      `${encodeURIComponent(String.fromCharCode(parseInt(value, 16)))}`
    )

  const href = `${FONTS_BASE_URL}${variant}:opsz,wght,FILL,GRAD@${opsz},${wght},${FILL},${GRAD}&display=swap&text=${symbols.join(',')}`
  const link = `<link rel="stylesheet" href="${href}">`

  return content.replace(/\/\/ @material-symbols-link/g, link)
}

export const replaceSymbolsTag = (content, includedSymbols) => {
  const symbols = Object.values(includedSymbols)
    .map((value: string) =>
      `${encodeURIComponent(String.fromCharCode(parseInt(value, 16)))}`
    )
  
  return content.replace(/\/\/ @material-symbols/g, `globalThis.symbols = '${symbols.join(',')}'`)
}

export const injectSymbols = (content, codepoints, symbols) => {
  return content.replaceAll(/(?:\@symbol\-)([aA-zZ]+)/g, (_, $1) => {
    !symbols.includes($1) && symbols.push($1)
    
    return `&#x${codepoints[$1]}`
  })
}