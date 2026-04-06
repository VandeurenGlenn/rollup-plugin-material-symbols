import type {MaterialSymbolsOptions} from './types.js'
import type {Plugin} from 'rollup'
/**
 * Rollup plugin to inline Material Symbols as SVG
 *
 * This plugin replaces references to Material Symbols icons with their
 * actual SVG content, improving performance compared to using icon fonts.
 */
declare const materialSymbolsSvg: (
  options?: Partial<MaterialSymbolsOptions>
) => Plugin
export {materialSymbolsSvg}
export default materialSymbolsSvg
