import gulp, { series } from 'gulp';
import ts from 'gulp-typescript';
//import replace from 'gulp-replace';
import { castAlias } from '../plugins/gulp';

const { clean } = require('./clean');

function compileTS() {
    const tsProject = ts.createProject('tsconfig.json');

    let baseDir = 'src';

    return gulp
        .src('src/**/*.{ts,tsx,js,jsx}', { base: baseDir })
        .pipe(castAlias(tsProject?.options?.paths, baseDir)) // convert all path mapping to relative path
        .pipe(tsProject())
        .pipe(gulp.dest('dist'));
}

exports.compileTS = series(clean, compileTS);
