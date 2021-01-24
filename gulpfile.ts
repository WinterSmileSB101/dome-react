import { parallel, series } from 'gulp';

import { cleanDist } from './tools/task/clean';
import serverTask from './tools/task/buildServer';
import clientTask from './tools/task/buildClient';
import configTask from './tools/task/buildConfig';

module.exports = {
    clean: cleanDist,
    buildConfig: configTask.buildConfig,
    'build:server': serverTask.compileTS,
    'watch:server': serverTask.watchToCompileTS,
    'build:client': clientTask.compileClient,
};

// exports.server = series(compileTS, buildConfig);
// exports['watch:server'] = watchToCompileTS;
