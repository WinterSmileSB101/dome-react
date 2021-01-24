import { glob } from 'glob';
import gulp from 'gulp';
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

function buildConfig() {
    log(chalk.green('build configs...'));

    return gulp
        .src('config/**/!(*.d).{js,ts,json}', { base: './config' })
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

        const globPath = path.resolve(PROJECT_PATH, `./dist/${IsDev ? 'development' : 'publish'}/server/modules/*`);
        const noDirGlobFiles = glob.sync(globPath, { nodir: true });
        const hasDirGlobFiles = glob.sync(globPath, { nodir: false });

        const onlyDirs = difference(hasDirGlobFiles, noDirGlobFiles);

        const fromDirBase = path.resolve(PROJECT_PATH, './dist');
        const fromDir = join(fromDirBase, '/conf');

        const toDirs = onlyDirs?.map((dir) => {
            return join(dir, './conf');
        });

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

export default {
    buildConfig: gulp.series(buildConfig, copyConfig),
    copyConfig,
};
