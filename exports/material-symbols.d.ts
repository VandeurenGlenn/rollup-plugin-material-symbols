import { MaterialSymbolsOptions } from './types.js';
declare const materialSymbolsSvg: (options: MaterialSymbolsOptions) => Promise<{
    name: string;
    buildStart: (options: any) => void;
    transform: (code: string, options: any) => Promise<any>;
    writeBundle: (bundleOptions: any, bundle: any) => Promise<void>;
}>;
export { materialSymbolsSvg };
export default materialSymbolsSvg;
