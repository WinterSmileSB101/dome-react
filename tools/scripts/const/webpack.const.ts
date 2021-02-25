import path from 'path';

import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
// import { CleanWebpackPlugin } from 'clean-webpack-plugin';

import ProjectConfig from './project.const';
import webpack from 'webpack';

const fixedPlugins = [
    new webpack.DefinePlugin({
        'process.env': {
            BROWSER: JSON.stringify(true),
        },
    }),
    new ForkTsCheckerWebpackPlugin({
        typescript: {
            configFile: path.resolve(ProjectConfig.PROJECT_PATH, './tsconfig.json'),
        },
    }),
];

export default {
    fixedPlugins,
};
