import {constants, readFile} from 'fs/promises'
import {join} from 'path'
import {baseStylingOptions, baseOptions} from './defaults.js'
import {env} from 'process'
import {accessSync} from 'fs'
import {createFilter} from '@rollup/pluginutils'

/**
 * Escapes user-supplied strings before embedding in a regular expression.
 */
const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
/**
 * Creates a regex pattern to match placeholder-style icon references
 * Example: @md_symbol-home matches "home"
 */
const createTagNameRegex = (tagName) =>
  new RegExp(`@${escapeRegex(tagName)}-([a-zA-Z0-9_]+)`, 'g')
/**
 * Creates a regex pattern to match icon names within custom elements
 * Example: <md-icon>home</md-icon> matches "home"
 */
const createElementRegex = (element) =>
  new RegExp(
    `<${escapeRegex(element)}(?:\\s[^>]*)?>\\s*([a-zA-Z0-9_]+)\\s*<\\/${escapeRegex(element)}>`,
    'g'
  )
/**
 * Injects SVG symbols into the content by replacing placeholders and element content
 */
const injectSymbols = (content, symbols, options) => {
  if (options.placeholderPrefix) {
    const regex = createTagNameRegex(options.placeholderPrefix)
    content = content.replaceAll(regex, (_, symbolName) => {
      const symbol = symbols[symbolName]
      if (!symbol) {
        console.warn(
          `[rollup-plugin-material-symbols] Symbol not found: ${symbolName}`
        )
        return _
      }
      return symbol
    })
  }
  if (options.elements?.length) {
    for (const element of options.elements) {
      const regex = createElementRegex(element)
      content = content.replaceAll(regex, (match, symbolName) => {
        const symbol = symbols[symbolName]
        if (!symbol) {
          console.warn(
            `[rollup-plugin-material-symbols] Symbol not found: ${symbolName}`
          )
          return match
        }
        return `<${element}>${symbol}</${element}>`
      })
    }
  }
  return content
}
/**
 * Extracts all symbol names referenced in the content
 */
const getSymbols = (content, options) => {
  const matchesSet = new Set()
  if (options.placeholderPrefix) {
    const regex = createTagNameRegex(options.placeholderPrefix)
    const matches = content.matchAll(regex)
    for (const match of matches) {
      if (match[1]) {
        matchesSet.add(match[1])
      }
    }
  }
  if (options.elements?.length) {
    for (const element of options.elements) {
      const regex = createElementRegex(element)
      const matches = content.matchAll(regex)
      for (const match of matches) {
        if (match[1]) {
          matchesSet.add(match[1])
        }
      }
    }
  }
  return Array.from(matchesSet)
}
/**
 * Rollup plugin to inline Material Symbols as SVG
 *
 * This plugin replaces references to Material Symbols icons with their
 * actual SVG content, improving performance compared to using icon fonts.
 */
const materialSymbolsSvg = (options = {}) => {
  const includedSymbols = {}
  const legacyOptions = options
  const hasLegacyTagName = typeof legacyOptions.tagName === 'string'
  // Merge with defaults - ensure all required fields are present
  const mergedOptions = {
    include: options.include ?? baseOptions.include,
    exclude: options.exclude ?? baseOptions.exclude,
    placeholderPrefix:
      options.placeholderPrefix ??
      legacyOptions.tagName ??
      baseOptions.placeholderPrefix,
    elements: options.elements ?? baseOptions.elements,
    tagName: legacyOptions.tagName,
    styling: {
      ...baseStylingOptions,
      ...options.styling
    }
  }
  const filter = createFilter(mergedOptions.include, mergedOptions.exclude)
  const variant = mergedOptions.styling.variant.toLowerCase()
  const weight = mergedOptions.styling.weight
  // Determine the root path for the Material Symbols SVG package
  const root = env.npm_config_local_prefix
    ? join(
        env.npm_config_local_prefix,
        'node_modules',
        `@material-symbols/svg-${weight}`
      )
    : join(process.cwd(), 'node_modules', `@material-symbols/svg-${weight}`)
  /**
   * Creates the full path to a symbol's SVG file
   */
  const createPath = (symbolName, fill) => {
    const filename = fill === 1 ? `${symbolName}-fill.svg` : `${symbolName}.svg`
    return join(root, variant, filename)
  }
  // Validate that the required package is installed
  try {
    accessSync(root, constants.R_OK)
  } catch (error) {
    throw new Error(
      `\n` +
        `@material-symbols/svg-${weight} NOT FOUND\n` +
        `You need to install this package to use 'rollup-plugin-material-symbols'.\n` +
        `Run: npm install -D @material-symbols/svg-${weight}\n`
    )
  }
  return {
    name: 'material-symbols',
    buildStart() {
      if (hasLegacyTagName && !options.placeholderPrefix) {
        this.warn(
          '[rollup-plugin-material-symbols] `tagName` is deprecated. Use `placeholderPrefix` instead.'
        )
      }
    },
    async transform(code, id) {
      if (!filter(id)) return null
      const symbols = getSymbols(code, mergedOptions)
      if (symbols.length === 0) return null
      // Load all missing symbols in parallel
      const loadPromises = []
      for (const symbolName of symbols) {
        if (!includedSymbols[symbolName]) {
          const loadPromise = (async () => {
            try {
              const svgPath = createPath(symbolName, mergedOptions.styling.fill)
              const svgContent = await readFile(svgPath, 'utf-8')
              includedSymbols[symbolName] = svgContent
            } catch (error) {
              console.error(
                `[rollup-plugin-material-symbols] Failed to load symbol "${symbolName}":`,
                error instanceof Error ? error.message : error
              )
              // Store empty string to avoid repeated attempts
              includedSymbols[symbolName] = ''
            }
          })()
          loadPromises.push(loadPromise)
        }
      }
      // Wait for all symbols to load
      await Promise.all(loadPromises)
      // Inject the symbols into the code
      const transformedCode = injectSymbols(
        code,
        includedSymbols,
        mergedOptions
      )
      // Only return if code was actually changed
      return transformedCode !== code ? {code: transformedCode} : null
    }
  }
}

export {materialSymbolsSvg as default, materialSymbolsSvg}
