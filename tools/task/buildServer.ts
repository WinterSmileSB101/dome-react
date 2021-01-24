import gulp, { parallel, series } from 'gulp';
import ts from 'gulp-typescript';
import { argv } from 'yargs';
import configTask from './buildConfig';
import { castAlias } from '../plugins/gulp';
//const { buildConfig } = require('./buildConfig');

import AllConst from '../scripts/const';
import { join } from 'path';
import { exec, spawnSync } from 'child_process';
const { PROJECT_PATH } = AllConst.ProjectConfig;

const { cleanDist } = require('./clean');

const IsDev = argv['dev'];

const compileGlob = 'src/**/*.{ts,tsx,js,jsx}';

let nodeServerStarted = false;

function compileTS() {
    const tsProject = ts.createProject('tsconfig.json');

    let baseDir = 'src';
    let compileGlob = 'src/**/*.{ts,tsx,js,jsx}';

    console.log('build server');

    return gulp
        .src(compileGlob, { base: baseDir })
        .pipe(castAlias(tsProject?.options?.paths, baseDir)) // convert all path mapping to relative path
        .pipe(tsProject())
        .pipe(gulp.dest(`dist/${IsDev ? '/development' : 'publish'}/server`));
}

function watchToCompile() {
    return gulp.watch(compileGlob, compileTS);
}

async function startNodeServer() {
    if (!nodeServerStarted) {
        console.log('start node server');
        nodeServerStarted = true;
        const isWindows: boolean = /^win/.test(process.platform);

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
    watchToCompileTS: parallel(series(cleanDist, compileTS, configTask.buildConfig, startNodeServer), watchToCompile),
    compileTS: series(cleanDist, compileTS, configTask.buildConfig),
};
