import { parallel } from 'gulp';
import chalk from 'chalk';
import { log } from 'console';
import glob from 'glob';
import path from 'path';
import { readFileSync, writeFileSync, existsSync, ensureDirSync } from 'fs-extra';

import AllConst from '../scripts/const';
import Coper from '../utils/copy';
import { cleanDir } from './clean';

const { PROJECT_PATH } = AllConst.ProjectConfig;
const additionFilePath = path.resolve(PROJECT_PATH, './dist/publish/packageFiles');

function buildFileSync(fileName: string) {
    const finalRelativePath = `./${fileName}`;
    const fileBuf = readFileSync(path.resolve(PROJECT_PATH, finalRelativePath));

    ensureDirSync(additionFilePath);
    // if (!existsSync(additionFilePath)) {
    //     mkdirSync(additionFilePath);
    // }

    writeFileSync(path.resolve(additionFilePath, finalRelativePath), fileBuf);
}

function buildFile(fileName: string) {
    return new Promise((reslove, reject) => {
        buildFileSync(fileName);

        reslove(undefined);
    });
}

function copyAllAdditionFiles() {
    return new Promise((reslove, reject) => {
        console.log('copy all package additional files');

        buildFileSync('Dockerfile');
        buildFileSync('package.json');

        const fromDir = path.resolve(additionFilePath);
        const toGlobPath = path.resolve(PROJECT_PATH, `./dist/publish/server/`);

        const coper = new Coper({
            patterns: [
                {
                    from: fromDir,
                    to: [toGlobPath],
                },
            ],
        });

        coper.run(() => {
            log(chalk.green('copy docker files done...', fromDir));
            cleanDir([additionFilePath])(() => {
                reslove(undefined);
            });
        });
    });
}

const staticGitPath = path.resolve(PROJECT_PATH, './publish_static_git');

function copyStaticGit() {
    return new Promise((reslove, reject) => {
        console.log('copy static git files');

        const fromDir = path.resolve(staticGitPath);
        const toGlobPath = path.resolve(PROJECT_PATH, `./dist/publish/static/`);

        const coper = new Coper({
            patterns: [
                {
                    from: fromDir,
                    to: [toGlobPath],
                },
            ],
        });

        coper.run(() => {
            log(chalk.green('copy docker files done...', fromDir));
            reslove(undefined);
        });
    });
}

export default {
    copyAllAdditionFiles,
    copyStaticGit,
};
