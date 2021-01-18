const { series } = require('gulp');
const { clean } = require('./tools/task/clean');
const { compileTS } = require('./tools/task/buildServer');
const { compileClient, compileClientProd } = require('./tools/task/buildClient');

module.exports = {
    clean,
    ['server']: compileTS,
    ['client']: compileClient,
};

module.exports.default = compileTS;
