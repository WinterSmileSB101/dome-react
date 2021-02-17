/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import webpack from 'webpack';
import { merge } from 'webpack-merge';
import glob from 'glob-all';
import PurgeCSSPlugin from 'purgecss-webpack-plugin';
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import AssetsPlugin from 'assets-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import common from './webpack.common';
import { UnionWebpackConfigWithDevelopmentServer } from '../types';
import AllConst, { WebpackConfig } from '../const';
import { getConfig } from '../utils';
import { PageResourceMapping } from './config/config.type';
import { ResourceNotBuildInMapping } from './config/page.resource';

const { PROJECT_PATH, STATIC_PATH_PRD } = AllConst.ProjectConfig;

const developmentConfig: UnionWebpackConfigWithDevelopmentServer = merge(common, {
    // devtool: 'none',
    mode: 'production',
    plugins: [
        ...WebpackConfig.fixedPlugins,
        new webpack.BannerPlugin({
            raw: true,
            banner:
                '/** @preserve Powered by react-ts-quick-starter (https://github.com/vortesnail/react-ts-quick-starter) */',
        }),
        // new BundleAnalyzerPlugin({
        //     // analyzerMode: "", // 开一个本地服务查看报告
        //     // analyzerHost: 'localhost', // host 设置
        //     // analyzerPort: 9628, // 端口号设置
        //     analyzerMode: 'static', // static mode
        //     reportFilename: './dist/analyzer/report.html',
        // }),
    ],
});

export default developmentConfig;
