const concurrently = require('concurrently');
const { argv } = require('yargs');

const IsDev = argv['dev'];
const modules = argv['modules'] || 'all';

const devScripts = [{ command: 'gulp server' }, { command: 'yarn dev:client' }];
const publishScripts = [{ command: 'gulp server' }, { command: `gulp client --images ${modules}` }];

concurrently(IsDev ? devScripts : publishScripts);
