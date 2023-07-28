import { MaterialSymbolsSvgOptions } from './lib/types.js';
declare const materialSymbolsSvg: (options: MaterialSymbolsSvgOptions) => Promise<{
    name: string;
    buildStart: (options: any) => void;
    transform: (code: string) => Promise<any>;
    writeBundle: (bundleOptions: any, bundle: any) => Promise<void>;
}>;
export { materialSymbolsSvg };
export default materialSymbolsSvg;
