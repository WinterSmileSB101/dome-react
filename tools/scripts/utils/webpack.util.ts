import { RuleSetUseItem } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const getCssLoader = (importLoaders: number, isDev: boolean): RuleSetUseItem[] => [
    // isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
    MiniCssExtractPlugin.loader,
    {
        loader: 'css-loader',
        options: {
            modules: false,
            sourceMap: isDev,
            importLoaders,
        },
    },
    {
        loader: 'postcss-loader',
        options: {
            sourceMap: isDev,
        },
    },
];

export default {
    getCssLoader,
};
