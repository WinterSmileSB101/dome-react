import log from 'fancy-log';
import webpack from 'webpack';
import chalk from 'chalk';
import { argv } from 'yargs';
import { parallel, series } from 'gulp';
import additionFiles from './buildAdditionFiles';

import prodConfig from '../scripts/webpack/webpack.production';

import devConfig from '../scripts/webpack/webpack.development';
import WebpackDevServer from 'webpack-dev-server';
import AllConst from '../scripts/const';

const { SERVER_HOST, SERVER_PORT } = AllConst.ServerConfig;

const IsDev = argv['dev'];

const finalConfig = IsDev ? devConfig : prodConfig;

function compileClient() {
    //return require('child_process').execSync(IsDev ? 'yarn watch:client' : 'build:client', { stdio: [0, 1, 2] });

    return new Promise(async function (reslove, reject) {
        log(chalk.green('>>>>>>>>>>>>>>>>> build client:', IsDev ? 'dev' : 'prod'));
        const compiler: webpack.Compiler = webpack(<webpack.Configuration>{
            ...finalConfig,
        });

        compiler.run(async function (err, stats) {
            console.log('\x1b[33m%\x1b[0m', 'webpack compile success');

            if (!!err) {
                console.error(err);
            }

            if (stats?.hasErrors()) {
                console.error(stats.compilation.errors.map((err) => err.message).join('\n'));
            }

            const scriptsMapping = stats.compilation.chunkGroups.reduce((rcc, cur) => {
                rcc[cur.options.name] = cur.chunks.map(({ name, files }) => ({ name, files }));

                return rcc;
            }, {});

            reslove(undefined);

            //console.log(scriptsMapping);
        });

        if (IsDev) {
            compiler.watch(finalConfig.watchOptions, (err, stats) => {
                if (!!err) {
                    console.error(err.message);

                    return;
                }

                if (!stats?.hasErrors()) {
                    console.log(stats.toString());
                }
            });
        }
        reslove(undefined);
    });
}

function startStaticServer() {
    return new Promise(async function (reslove, reject) {
        log(chalk.green('>>>>>>>>>>>>>>>>> start static server'));
        const compiler: webpack.Compiler = webpack(<webpack.Configuration>{
            ...finalConfig,
        });

        // not catch close event, other wise it's will puts error out.
        new WebpackDevServer(compiler, {
            host: SERVER_HOST,
            port: SERVER_PORT,
            hot: true,
            contentBase: 'dist/development/static',
            //contentBasePublicPath: 'dist',
            //publicPath: `/dist`,
            stats: 'errors-only',
            clientLogLevel: 'silent',
            compress: true,
            // open: true,
        }).listen(SERVER_PORT, SERVER_HOST, () => {
            log(chalk.green('static server listen on ', SERVER_PORT));
        });

        reslove(undefined);
    });
}

export default {
    compileClient: IsDev ? parallel(compileClient, startStaticServer) : series(compileClient),
};
