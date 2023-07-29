import { MaterialSymbolsOptions } from './types.js';
declare const materialSymbolsSvg: (options: MaterialSymbolsOptions) => Promise<{
    name: string;
    buildStart: (options: any) => void;
    transform: (code: string) => Promise<any>;
    onLog(level: any, log: any): any;
    writeBundle: (bundleOptions: any, bundle: any) => Promise<void>;
}>;
export { materialSymbolsSvg };
export default materialSymbolsSvg;
