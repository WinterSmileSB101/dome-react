/* eslint-disable import/no-extraneous-dependencies */
import { merge } from 'webpack-merge';
import common from './webpack.common';
import { UnionWebpackConfigWithDevelopmentServer } from '../types';
import proxy from '../../../config/proxy';

import AllConst from '../const';
import path from 'path';

const { SERVER_HOST, SERVER_PORT } = AllConst.ServerConfig;
const { PROJECT_PATH, IS_DEV } = AllConst.ProjectConfig;

console.log(IS_DEV);

const developmentConfig: UnionWebpackConfigWithDevelopmentServer = merge(common, {
    devtool: 'eval-source-map',
    mode: 'development',
    output: {
        path: path.resolve(PROJECT_PATH, `./dist/development`),
        filename: `static/scripts/[name].js`,
    },
    // output: {
    //     //path: path.resolve(PROJECT_PATH, `./dist/development`),
    //     filename: `static/scripts/[name].js`,
    //     publicPath: `${SERVER_HOST}:${SERVER_PORT}/`,
    // },
    // watch: true,
    // watchOptions: {
    //     aggregateTimeout: 3000,
    //     ignored: /node_modules/,
    // },
    // devServer: {
    //     host: SERVER_HOST,
    //     port: SERVER_PORT,
    //     //contentBase: '',
    //     contentBase: 'dist/development/static',
    //     //contentBasePublicPath: 'dist',
    //     //publicPath: `/dist`,
    //     stats: 'errors-only',
    //     clientLogLevel: 'silent',
    //     compress: true,
    //     // open: true,
    //     hot: true,
    //     // proxy: { ...proxy },
    // },
});

export default developmentConfig;
