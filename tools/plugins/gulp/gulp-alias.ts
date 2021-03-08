import { isArray, trimEnd } from 'lodash';
import path from 'path';
import through from 'through2';
import trimStart from '../../../src/libs/common/utils/string.util';

const findSelfLevels = (target: string[], compareTo: string[]) => {
    //let level = target?.length + 1;
    let matchLevel = 0;

    // console.log('pa');
    // console.log(target);

    // console.log('pb');
    // console.log(compareTo);

    for (let i = 0; i < target?.length ?? 0; i++) {
        const isContinue = target[i] === compareTo[i];

        if (!isContinue) {
            break;
        }

        matchLevel = i + 1;
        //level = target?.length - (i + 1);
    }

    return { levels: target?.length - matchLevel || 1, matchLevels: matchLevel };
};

const findAllMatch = (target: string, matchRe: string, groupIndex: number = 0) => {
    const results = [];
    let match: RegExpExecArray;

    const reg = new RegExp(matchRe, 'gi');

    while ((match = reg.exec(target))) {
        results.push(match[groupIndex]);
    }

    return results;
};

const getRelativePath = (levels: number) => {
    // levels===1 ===> ./
    // levels===2 ===> ../
    // levels===3 ===> ../../
    // levels===4 ===> ../../../
    // and so on

    const baseRelativePath = '../';
    const defaultPath = './'; // levels 1 is ./
    let relativePath = '';

    while (levels >= 2) {
        relativePath += baseRelativePath;

        levels -= 1;
    }

    return relativePath?.length > 0 ? relativePath : defaultPath;
};

const getParsedPaths = (paths: { [key: string]: string | string[] }, baseDir: string) => {
    const allPathKeys = Object.keys(paths ?? {});

    return allPathKeys
        ?.filter((key) => {
            const path = isArray(paths[key]) ? paths[key][0] : (paths[key] as string);

            return path?.includes(baseDir);
        })
        .map((key) => {
            const path = isArray(paths[key]) ? paths[key][0] : (paths[key] as string);
            let value = trimStart.trimStart(path, `../${baseDir}/`);
            value = trimStart.trimStart(value, `./${baseDir}/`);
            value = trimStart.trimStart(value, `${baseDir}/`);

            return {
                key: key?.replace(/([/*]|[*])$/gi, ''),
                value: value?.replace(/([/*]|[*])$/gi, ''),
            };
        });
    // ?.reduce((prev, current, i) => {
    //     current[prev.key] = prev.value;

    //     return current;
    // });
};

exports.castAlias = function replaceAlias(
    alias: { [key: string]: string | string[] },
    baseDir: string,
    specialStartChar: string = '@',
) {
    const allPathKeys = Object.keys(alias ?? {});

    const allParsedPaths = getParsedPaths(alias, baseDir);

    console.log(allParsedPaths);

    const stream = through.obj((file, encoding, callback) => {
        if (allPathKeys?.length <= 0) {
            return callback(undefined, file);
        }

        if (file.isNull()) {
            return callback(undefined, file);
        }

        if (!file.isBuffer()) {
            callback(undefined, file);
        }

        // if (file.isStream()) {
        //     console.log('stream');
        //     //console.log(file.contents);
        // }

        if (file.isBuffer()) {
            // console.log(file.history); // all path
            // console.log(file.base);
            // console.log(file.relative); // relative path
            let fileContents = String(file.contents);

            const spitedFilePath = file.relative.split(path.sep) as [];
            allParsedPaths.forEach((parsedPath) => {
                if (new RegExp(`(?:[from ]|[require(])(?:["]|['])${parsedPath.key}.*["|']`).test(fileContents)) {
                    const allMatchContents = findAllMatch(
                        fileContents,
                        `(?:[from ]|[require(])(?:["]|['])(${parsedPath.key}.*)["|']`,
                        1,
                    );

                    allMatchContents.forEach((match: string) => {
                        const spitedMatches = match.slice(1)?.split('/');

                        const levels = findSelfLevels(spitedFilePath, spitedMatches);
                        const completelyMatch =
                            levels.matchLevels !== 0 && levels.matchLevels === spitedMatches?.length;

                        const matchPaths = completelyMatch
                            ? spitedMatches
                            : spitedFilePath?.slice(0, levels.matchLevels);
                        const matchPath = matchPaths?.join('/');
                        // get all prefix pat like ../../
                        const pathPrefix = getRelativePath(levels.levels);

                        // if (file.relative.includes('app.server.ts')) {
                        //     console.log(file.relative);
                        //     console.log(matchPath);
                        //     console.log(levels);
                        //     console.log(match);
                        //     console.log(pathPrefix);
                        // }

                        // use match paths to match and replace again, @ is default

                        fileContents = fileContents?.replace(new RegExp(`(['|"])${match}`, 'gi'), (contentMatcher) => {
                            // if (file.relative.includes('app.server.ts')) {
                            //     console.log(
                            //         'match:',
                            //         contentMatcher.replace(
                            //             `${specialStartChar}${matchPath}${
                            //                 completelyMatch || matchPath.length === 0 ? '' : '/'
                            //             }`,
                            //             completelyMatch ? trimEnd(pathPrefix, '/') : pathPrefix,
                            //         ),
                            //     );
                            // }

                            return contentMatcher.replace(
                                `${specialStartChar}${matchPath}${
                                    completelyMatch || matchPath.length === 0 ? '' : '/' // completelyMatch means completely replace,so not need /,matchPath length is 0,means need replace @,so not need /
                                }`,
                                completelyMatch ? trimEnd(pathPrefix, '/') : pathPrefix,
                            );
                        });
                    });
                }
            });

            file.contents = Buffer.from(fileContents, encoding);
        }

        callback(undefined, file);
    });

    return stream;
};
