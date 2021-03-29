import { PageResourceMapping } from './config/config.type';
/* eslint-disable import/no-extraneous-dependencies */
import { merge } from 'webpack-merge';
import path from 'path';
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';
import AssetsPlugin from 'assets-webpack-plugin';
import glob from 'glob-all';
import PurgeCSSPlugin from 'purgecss-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import common from './webpack.common';
import { UnionWebpackConfigWithDevelopmentServer } from '../types';

import AllConst from '../const';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { ResourceNotBuildInMapping } from './config/page.resource';
import { getConfig } from '../utils';

const { PROJECT_PATH, IS_DEV, STATIC_PATH_DEV } = AllConst.ProjectConfig;

const developmentConfig: UnionWebpackConfigWithDevelopmentServer = merge(common, {
    devtool: 'eval-source-map',
    mode: 'development',
    // output: {
    //     path: path.resolve(PROJECT_PATH, `./dist/development/static`),
    //     filename: `scripts/[name].js`,
    // },
    plugins: [
        new CleanWebpackPlugin(),

        new HardSourceWebpackPlugin(), //only use in dev environment
        new HardSourceWebpackPlugin.ExcludeModulePlugin([
            {
                test: /mini-css-extract-plugin[\\/]dist[\\/]loader/,
            },
        ]),
    ],
});

export default developmentConfig;
