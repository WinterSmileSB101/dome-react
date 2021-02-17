/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import { argv } from 'yargs';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import WebpackBar from 'webpackbar';

import TerserPlugin from 'terser-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import AssetsPlugin from 'assets-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import glob from 'glob-all';
import PurgeCSSPlugin from 'purgecss-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { UnionWebpackConfigWithDevelopmentServer } from '../types';

import AllConst, { WebpackConfig } from '../const';
import AllUtils, { getConfig } from '../utils';
import { PageMapping, PageResourceMapping } from './config/config.type';
import { ResourceNotBuildInMapping } from './config/page.resource';

const { PROJECT_PATH, STATIC_PATH_DEV, STATIC_PATH_PRD } = AllConst.ProjectConfig;

const { getCssLoader } = AllUtils.WebpackUtils;

const getEntry = (): PageMapping => {
    const pageConfig = getConfig('page.entry.ts', './tools/scripts/webpack/config') as PageMapping;

    const pageMapping: PageMapping = {};
    Object.keys(pageConfig).forEach((key) => {
        const value = pageConfig[key];

        if (value?.trim()?.length >= 0) {
            pageMapping[key] = path.resolve(PROJECT_PATH, pageConfig[key]);
        }
    });

    return pageMapping;
};

const chunks = getEntry();

// console.log(chunks);

const IsDev = argv['dev'] as boolean;

const config: UnionWebpackConfigWithDevelopmentServer = {
    mode: 'production',
    entry: chunks,
    // devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    ...getCssLoader(2, IsDev),
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: IsDev,
                        },
                    },
                ],
            },
            {
                test: /\.less$/,
                use: [
                    ...getCssLoader(2, IsDev),
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: IsDev,
                        },
                    },
                ],
            },
            // load css
            {
                test: /\.css$/,
                use: getCssLoader(1, IsDev),
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10 * 1024,
                            name: '[name].[contenthash:8].[ext]',
                            outputPath: 'assets/images',
                        },
                    },
                ],
            },
            {
                test: [/\.(ttf|woff|woff2|eot|otf)$/],
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[contenthash:8].[ext]',
                            outputPath: 'assets/fonts',
                        },
                    },
                ],
            },
            {
                test: /\.(tsx?|js)$/,
                loader: 'babel-loader',
                options: { cacheDirectory: true },
                exclude: /node_modules/,
            },
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias: {
            '@libs': path.resolve(PROJECT_PATH, './src/libs'),
            '@static': path.resolve(PROJECT_PATH, './static'),
            '@config': path.resolve(PROJECT_PATH, './config'),
            '@': path.resolve(PROJECT_PATH, './src'),
        },
    },
    output: {
        path: path.resolve(PROJECT_PATH, `./dist/${IsDev ? 'development' : 'publish'}`),
        filename: `static/scripts/[name].${IsDev ? '' : '[contenthash].'}js`,
    },
    plugins: [
        ...WebpackConfig.fixedPlugins,
        // new HtmlWebpackPlugin({
        //     template: path.resolve(PROJECT_PATH, './public/index.html'),
        //     filename: 'index.html',
        //     cache: false,
        //     minify: IS_DEV
        //         ? false
        //         : {
        //               removeAttributeQuotes: true,
        //               collapseWhitespace: true,
        //               removeComments: true,
        //               collapseBooleanAttributes: true,
        //               collapseInlineTagWhitespace: true,
        //               removeRedundantAttributes: true,
        //               removeScriptTypeAttributes: true,
        //               removeStyleLinkTypeAttributes: true,
        //               minifyCSS: true,
        //               minifyJS: true,
        //               minifyURLs: true,
        //               useShortDoctype: true,
        //           },
        // }),
        // new PurgeCSSPlugin({
        //     paths: glob.sync(
        //         [
        //             `${path.resolve(PROJECT_PATH, './src')}/**/*.{ts,tsx,scss,less,css}`,
        //             `${path.resolve(PROJECT_PATH, './public')}/**/*.html`,
        //         ],
        //         { nodir: true },
        //     ),
        // }),
        new MiniCssExtractPlugin({
            filename: 'static/styles/[name].[contenthash:8].css',
            chunkFilename: 'static/styles/[name].[contenthash:8].css',
            ignoreOrder: false,
        }),
        new CopyPlugin({
            patterns: [
                {
                    context: path.resolve(PROJECT_PATH, './static/assets'),
                    from: '*',
                    to: path.resolve(PROJECT_PATH, `./dist/${IsDev ? 'development' : 'publish'}/static/assets`),
                    toType: 'dir',
                },
            ],
            // copyUnmodified: true,
        }),
        new WebpackBar({
            name: IsDev ? 'Starting' : 'Packaging',
            color: '#fa8c16',
        }),
        new CircularDependencyPlugin({
            exclude: /node_modules/,
            include: /src/,
            failOnError: true,
            allowAsyncCycles: false,
            cwd: process.cwd(),
        }),
        new AssetsPlugin({
            path: path.resolve(PROJECT_PATH, './dist/development/server/conf'),
            filename: 'resources.mapping.json',
            processOutput: function (mapping) {
                console.log('build.........resources');
                console.log(mapping);

                const scripts = {};

                const devPath = STATIC_PATH_DEV?.endsWith('/') ? STATIC_PATH_DEV : STATIC_PATH_DEV + '/';
                const prdPath = STATIC_PATH_PRD?.endsWith('/') ? STATIC_PATH_PRD : STATIC_PATH_PRD + '/';
                const scriptPath = IsDev ? devPath : prdPath;

                const pageResourceConfig = getConfig(
                    'page.resource.ts',
                    './tools/scripts/webpack/config',
                ) as PageResourceMapping;
                for (let key in mapping) {
                    if (!ResourceNotBuildInMapping.includes(key) && !!mapping[key]?.js) {
                        const resources = pageResourceConfig[key]?.scripts;
                        const currentScripts: string[] = [];
                        if (mapping[key]?.js?.length > 0) {
                            // push main resource into currentScripts
                            currentScripts.push(`${scriptPath}${mapping[key]?.js}`);
                        }

                        // push other special script into currentScripts
                        for (let resource in resources) {
                            if (!!mapping[resource]?.js) {
                                currentScripts.push(`${scriptPath}${mapping[resource]?.js}`);
                            }
                        }

                        const currentStyles: string[] = [];
                        if (mapping[key]?.css?.length > 0) {
                            // push main resource into currentScripts
                            currentStyles.push(`${scriptPath}${mapping[key]?.css}`);
                        }

                        // push other special script into currentScripts
                        for (let resource in resources) {
                            if (!!mapping[resource]?.css) {
                                currentStyles.push(`${scriptPath}${mapping[resource]?.css}`);
                            }
                        }

                        scripts[key] = { js: currentScripts, css: currentStyles };
                    }
                }

                return `${JSON.stringify(scripts, null, 2)}`;
            },
        }),
        // new AssetsPlugin({
        //     path: path.resolve(PROJECT_PATH, './dist/development/server/conf'),
        //     filename: 'styles.mapping.json',
        //     processOutput: function (mapping) {
        //         console.log('build.........styles');
        //         console.log(mapping);
        //         const scripts = {};
        //         for (let key in mapping) {
        //             if (!!mapping[key]?.css) {
        //                 scripts[key] = { css: mapping[key]?.css };
        //             }
        //         }

        //         return `${JSON.stringify(scripts, null, 2)}`;
        //     },
        // }),
    ],
    optimization: {
        minimize: !IsDev,
        minimizer: [
            !IsDev &&
                new TerserPlugin({
                    extractComments: false,
                    terserOptions: {
                        compress: { pure_funcs: ['console.log'] },
                    },
                }),
            !IsDev && new OptimizeCssAssetsPlugin(),
        ].filter(Boolean),
        splitChunks: {
            chunks: 'initial',
            minSize: 20000,
            minChunks: 1,
            maxAsyncRequests: 7,
            maxInitialRequests: 4,
            name: true,
            automaticNameDelimiter: '~',
            cacheGroups: {
                vendors: {
                    test: /[/\\]node_modules[/\\]/,
                    minChunks: 2,
                    priority: -5,
                    name: 'vendors',
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
    },
};

export default config;
