import log from 'fancy-log';
import chalk from 'chalk';
import { argv } from 'yargs';
import path, { join } from 'path';
import AllConst from '../scripts/const';
import { glob } from 'glob';
import { difference } from 'lodash';
import Coper from '../utils/copy';
import { cleanDir } from './clean';

const { PROJECT_PATH } = AllConst.ProjectConfig;

const IsDev = argv['dev'];

function adjustClientMappingFiles() {
    return new Promise((reslove, reject) => {
        log(chalk.green(`adjust ${IsDev ? 'dev' : 'prod'} client mapping files`));

        //const globPath = path.resolve(PROJECT_PATH, `./dist/${IsDev ? 'development' : 'publish'}/server/`);
        //const noDirGlobFiles = glob.sync(globPath, { nodir: true });
        //const hasDirGlobFiles = glob.sync(globPath, { nodir: false });

        //const onlyDirs = difference(hasDirGlobFiles, noDirGlobFiles);
        const mappingToPath = path.resolve(PROJECT_PATH, `./dist/${IsDev ? 'development' : 'publish'}/server/conf`);
        const fromDirBase = path.resolve(PROJECT_PATH, './dist');
        const fromDir = join(fromDirBase, '/conf');

        const coper = new Coper({
            patterns: [
                {
                    from: fromDir,
                    to: [mappingToPath],
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
    adjustClientMappingFiles,
};
