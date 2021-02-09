import { glob } from 'glob';
import gulp, { series } from 'gulp';
import path, { join } from 'path';
import log from 'fancy-log';
import chalk from 'chalk';
import { argv } from 'yargs';
import { removeSync } from 'fs-extra';

import AllConst from '../scripts/const';
const { PROJECT_PATH } = AllConst.ProjectConfig;
// import glob from 'glob';
// import { argv } from 'yargs';

import { toJSON } from './toJson';
import { difference } from 'lodash';
import { cleanDir } from './clean';
import Coper from '../utils/copy';

const IsDev = argv['dev'];
const configGlob = 'config/**/!(*.d).{js,ts,json}';

function buildConfig() {
    log(chalk.green(`build configs...${IsDev ? 'dev' : 'prod'}`));

    return gulp
        .src(configGlob, { base: './config' })
        .pipe(toJSON)
        .pipe(gulp.dest(IsDev ? 'dist/development/server/conf' : `dist/conf`));
}

function copyConfig() {
    return new Promise((reslove, reject) => {
        if (!!IsDev) {
            log(chalk.green('dev pass copy config'));
            return reslove(undefined);
        }

        log(chalk.green('copy configs...'));

        const globPath = path.resolve(PROJECT_PATH, `./dist/${IsDev ? 'development' : 'publish'}/server/`);
        const noDirGlobFiles = glob.sync(globPath, { nodir: true });
        const hasDirGlobFiles = glob.sync(globPath, { nodir: false });

        const onlyDirs = difference(hasDirGlobFiles, noDirGlobFiles);

        const fromDirBase = path.resolve(PROJECT_PATH, './dist');
        const fromDir = join(fromDirBase, '/conf');

        const toDirs = onlyDirs?.map((dir) => {
            return join(dir, './conf');
        });

        log(chalk.green(toDirs));

        if (toDirs?.length <= 0) {
            reject('copy config: no any to dir.');
        }

        const coper = new Coper({
            patterns: [
                {
                    from: fromDir,
                    to: toDirs,
                },
            ],
        });

        coper.run(() => {
            log(chalk.green('clear configs...', fromDir));
            cleanDir(fromDir)(() => {
                reslove(undefined);
            });
            // cleanDir(['dist/conf'])(() => {
            //     reslove(undefined);
            // });
        });
    });
}

function watchToCompile() {
    return gulp.watch(configGlob, series(buildConfig, copyConfig));
}

export default {
    buildConfig: gulp.series(buildConfig, copyConfig),
    watchConfig: watchToCompile,
    copyConfig,
};
