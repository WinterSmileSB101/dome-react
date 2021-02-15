import { PageResourceMapping } from './config/config.type';
/* eslint-disable import/no-extraneous-dependencies */
import { merge } from 'webpack-merge';
import path from 'path';
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';
import AssetsPlugin from 'assets-webpack-plugin';

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
    output: {
        path: path.resolve(PROJECT_PATH, `./dist/development/static`),
        filename: `scripts/[name].js`,
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HardSourceWebpackPlugin(), //only use in dev environment
        new AssetsPlugin({
            path: path.resolve(PROJECT_PATH, './dist/development/server/conf'),
            filename: 'scripts.mapping.json',
            processOutput: function (mapping) {
                console.log('build.........scripts');

                const scripts = {};

                const scriptPath = STATIC_PATH_DEV?.endsWith('/') ? STATIC_PATH_DEV : STATIC_PATH_DEV + '/';

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
            path: path.resolve(PROJECT_PATH, './dist/development/server/conf'),
            filename: 'styles.mapping.json',
            processOutput: function (mapping) {
                const scripts = {};
                for (let key in mapping) {
                    if (!!mapping[key]?.css) {
                        scripts[key] = { css: mapping[key]?.css };
                    }
                }
                console.log('build.........styles');

                return `${JSON.stringify(scripts, null, 2)}`;
            },
        }),
    ],
});

export default developmentConfig;
