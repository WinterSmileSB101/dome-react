// eslint-disable-next-line unicorn/filename-case
import gulp, { parallel, series } from 'gulp';
import ts from 'gulp-typescript';
import { argv } from 'yargs';
import { exec, spawnSync } from 'child_process';
// eslint-disable-next-line unicorn/import-style
import path, { join } from 'path';
import configTask from './buildConfig';
import { castAlias } from '../plugins/gulp';
import additionFiles from './buildAdditionFiles';
// const { buildConfig } = require('./buildConfig');

import AllConst from '../scripts/const';

import { cleanDir } from './clean';
import Coper from '../utils/copy';
import glob from 'glob';
import { log } from 'console';
import chalk from 'chalk';

const { PROJECT_PATH } = AllConst.ProjectConfig;

const IsDevelopment = argv.dev;

const compileGlob = 'src/**/*.{ts,tsx,js,jsx}';

let nodeServerStarted = false;

function compileTS() {
    const tsProject = ts.createProject('tsconfig.json');

    const baseDir = 'src';

    console.log('build server');

    return gulp
        .src(compileGlob, { base: baseDir })
        .pipe(castAlias(tsProject?.options?.paths, baseDir)) // convert all path mapping to relative path
        .pipe(tsProject())
        .pipe(gulp.dest(`dist/${IsDevelopment ? '/development' : 'publish'}/server`));
}

function copyLibs() {
    return new Promise((reslove, reject) => {
        console.log('copy libs');

        const fromDir = path.resolve(PROJECT_PATH, './dist/publish/server/libs');
        const toGlobPath = path.resolve(PROJECT_PATH, `./dist/publish/server/modules/*`);

        const coper = new Coper({
            patterns: [
                {
                    from: fromDir,
                    to: glob.sync(toGlobPath, { nodir: true }),
                },
            ],
        });

        coper.run(() => {
            log(chalk.green('clear libs...', fromDir));
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
    return gulp.watch(compileGlob, compileTS);
}

async function startNodeServer() {
    if (!nodeServerStarted) {
        console.log('start node server');
        nodeServerStarted = true;
        const isWindows: boolean = process.platform.startsWith('win');

        const shellFile = isWindows ? 'nodemon.bat' : 'nodemon.command';
        const script = join(PROJECT_PATH, './tools/bin', shellFile);

        if (process.platform === 'darwin') {
            return spawnSync('open', ['-a', 'terminal', script], { cwd: join(PROJECT_PATH) });
        }

        if (isWindows) {
            return exec(`start cmd.exe /k "${script}"`);
        }
    }
}

export default {
    watchToCompileTS: parallel(
        series(compileTS, configTask.buildConfig, startNodeServer),
        watchToCompile,
        configTask.watchConfig,
    ),
    compileTS: series(compileTS, configTask.buildConfig, additionFiles.copyAllAdditionFiles),
};
