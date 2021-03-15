import path from 'path';
import { argv } from 'yargs';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
// import { CleanWebpackPlugin } from 'clean-webpack-plugin';

import ProjectConfig from './project.const';
import webpack from 'webpack';

const IsDev = argv['dev'] as boolean;

const fixedPlugins = [
    new webpack.DefinePlugin({
        'process.env': {
            BROWSER: JSON.stringify(true),
            ROOT_STATIC_HOST: JSON.stringify(IsDev ? 'http://localhost:9627/' : ''),
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
