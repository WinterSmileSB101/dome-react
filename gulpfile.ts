const { series } = require('gulp');
const { clean } = require('./tools/task/clean');
const { compileTS } = require('./tools/task/buildServer');

module.exports = {
    clean,
    ['build:server-side']: compileTS,
};

module.exports.default = compileTS;
