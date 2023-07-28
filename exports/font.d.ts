import { MaterialSymbolsOptions } from './lib/types.js';
declare const materialSymbolsFont: (options: MaterialSymbolsOptions) => Promise<{
    name: string;
    buildStart: (options: any) => void;
    transform: (code: any, id: any) => Promise<any>;
    writeBundle: (bundleOptions: any, bundle: any) => Promise<void>;
}>;
export { materialSymbolsFont };
export default materialSymbolsFont;
