type CreateArrayFromNumber<N extends number, Result extends unknown[] = []> = Result['length'] extends N ? Result : CreateArrayFromNumber<N, [...Result, 1]>;
type NumericRange<A extends number[], E extends number, Result extends number = never> = A['length'] extends E ? Result | E : NumericRange<[...A, 1], E, Result | A['length']>;
type TwentyToFortyEight = NumericRange<CreateArrayFromNumber<20>, 49>;
export declare type MaterialSymbolsVariant = 'Outlined' | 'Rounded' | 'Sharp';
export declare type MaterialSymbolsOptions = {
    variant?: MaterialSymbolsVariant;
    includeHTML?: boolean | string;
    copyHTML?: boolean | string[] | string;
    customTheme: boolean | string;
    styling?: {
        opsz?: TwentyToFortyEight;
        wght?: 100 | 200 | 300 | 400 | 500 | 600 | 700;
        FILL?: 0 | 1;
        GRAD?: -25 | 0 | 200;
    };
};
declare const variants: MaterialSymbolsVariant[];
declare const materialSymbols: (options: MaterialSymbolsOptions) => Promise<{
    name: string;
    buildStart: (options: any) => void;
    transform: (code: any, id: any) => Promise<any>;
    writeBundle: (bundleOptions: any, bundle: any) => Promise<void>;
}>;
export { materialSymbols, variants };
export default materialSymbols;
