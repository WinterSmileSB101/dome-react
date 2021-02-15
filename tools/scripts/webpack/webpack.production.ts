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
        new AssetsPlugin({
            path: path.resolve(PROJECT_PATH, './dist/conf'),
            filename: 'scripts.mapping.json',
            processOutput: function (mapping) {
                const scripts = {};
                const scriptPath = STATIC_PATH_PRD?.endsWith('/') ? STATIC_PATH_PRD : STATIC_PATH_PRD + '/';

                const pageResourceConfig = getConfig(
                    'page.resource.ts',
                    './tools/scripts/webpack/config',
                ) as PageResourceMapping;
                for (let key in mapping) {
                    if (!ResourceNotBuildInMapping.includes(key) && !!mapping[key]?.js) {
                        const resources = pageResourceConfig[key]?.scripts;
                        const currentScripts: string[] = [];
                        // push main resource into currentScripts
                        currentScripts.push(`${scriptPath}${mapping[key]?.js}`);

                        // push other special script into currentScripts
                        for (let resource in resources) {
                            if (!!mapping[resource]?.js) {
                                currentScripts.push(`${scriptPath}${mapping[resource]?.js}`);
                            }
                        }
                        scripts[key] = { js: currentScripts };
                    }
                }

                return `${JSON.stringify(scripts, null, 2)}`;
            },
        }),
        new AssetsPlugin({
            path: path.resolve(PROJECT_PATH, './dist/conf/'),
            filename: 'styles.mapping.json',
            processOutput: function (mapping) {
                const scripts = {};
                for (let key in mapping) {
                    if (!!mapping[key]?.css) {
                        scripts[key] = { css: mapping[key]?.css };
                    }
                }

                return `${JSON.stringify(scripts, null, 2)}`;
            },
        }),
        new PurgeCSSPlugin({
            paths: glob.sync(
                [
                    `${path.resolve(PROJECT_PATH, './src')}/**/*.{ts,tsx,scss,less,css}`,
                    `${path.resolve(PROJECT_PATH, './public')}/**/*.html`,
                ],
                { nodir: true },
            ),
        }),
        new MiniCssExtractPlugin({
            filename: 'static/styles/[name].[contenthash:8].css',
            chunkFilename: 'static/styles/[name].[contenthash:8].css',
            ignoreOrder: false,
        }),
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
