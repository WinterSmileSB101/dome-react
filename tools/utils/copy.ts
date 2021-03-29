import { copy, CopyOptions, CopyOptionsSync, copySync } from 'fs-extra';
import path from 'path';
import log from 'fancy-log';
import chalk from 'chalk';
import { isFunction } from 'lodash';

export interface Pattern {
    from: string;
    to: Array<string>;

    options?: CopyOptions | CopyOptionsSync;
}

export interface CoperOptions {
    /**
     * default:
     */
    rootPath?: string;
    patterns: Array<Pattern>;
}

export default class Coper {
    private readonly rootPath: string;
    private readonly patterns: Array<Pattern>;

    constructor(options: CoperOptions) {
        this.rootPath = options?.rootPath ?? path.resolve(process.cwd());
        this.patterns = options?.patterns ?? [];
    }

    run(cb?: () => void) {
        this.patterns?.forEach((pattern, i) => {
            this.workDir(pattern, i === this.patterns?.length - 1, cb);
        });
    }

    private workDir(pattern: Pattern, isLastPattern?: boolean, cb?: () => void) {
        if (!pattern) {
            return;
        }

        let fromPath = path.normalize(pattern?.from);

        if (!path.isAbsolute(fromPath)) {
            fromPath = path.resolve(this.rootPath, fromPath);
        }

        pattern?.to?.forEach((to, i) => {
            const isLastTo = isLastPattern && i === pattern?.to?.length - 1;

            let toPath = path.normalize(to);
            if (!path.isAbsolute(toPath)) {
                path.resolve(this.rootPath, toPath);
            }

            copy(fromPath, toPath, pattern?.options)
                .then(() => {
                    log(chalk.green(`已完成拷贝 ==> [${fromPath}] to [${toPath}]`));

                    if (!!isLastTo && isFunction(cb)) {
                        cb();
                    }
                })
                .catch((err) => {
                    log(chalk.red('无法完成本次拷贝，错误原因 ==>', err));
                    if (!!isLastTo && isFunction(cb)) {
                        cb();
                    }
                });
        });
    }

    runSync() {
        this.patterns?.forEach((pattern, i) => {
            this, this.workDirSync(pattern);
        });
    }

    private workDirSync(pattern: Pattern) {
        if (!pattern) {
            return;
        }

        let fromPath = path.normalize(pattern?.from);

        if (!path.isAbsolute(fromPath)) {
            fromPath = path.resolve(this.rootPath, fromPath);
        }

        pattern?.to?.forEach((to, i) => {
            let toPath = path.normalize(to);
            if (!path.isAbsolute(toPath)) {
                path.resolve(this.rootPath, toPath);
            }

            try {
                copySync(fromPath, toPath);
                log(chalk.green(`已完成拷贝 ==> [${fromPath}] to [${toPath}]`));
            } catch (err) {
                log(chalk.red('无法完成本次拷贝，错误原因 ==>', err));
            }

            // .then(() => {
            //     log(chalk.green(`已完成拷贝 ==> [${fromPath}] to [${toPath}]`));

            //     if (!!isLastTo && isFunction(cb)) {
            //         cb();
            //     }
            // })
            // .catch((err) => {
            //     log(chalk.red('无法完成本次拷贝，错误原因 ==>', err));
            //     if (!!isLastTo && isFunction(cb)) {
            //         cb();
            //     }
            // });
        });
    }
}
