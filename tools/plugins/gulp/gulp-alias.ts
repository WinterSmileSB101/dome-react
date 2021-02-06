import { isArray } from 'lodash';
import path from 'path';
import through from 'through2';
import trimStart from '../../../src/libs/common';

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

exports.castAlias = function replaceAlias(alias: { [key: string]: string | string[] }, baseDir: string) {
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
            console.log(file.relative)
            const levels = file.relative.split(path.sep)?.length || 1;
            allParsedPaths.forEach((path) => {
                if (new RegExp(`([from ]|[require(])(["]|['])${path.key}.*["|']`).test(fileContents)) {
                    const pathPrefix = getRelativePath(levels);
                    console.log(path.key,pathPrefix,path.value);

                    fileContents = fileContents?.replace(
                        new RegExp(`(['|"])${path.key}`, 'gi'),
                        `$1${pathPrefix + path.value}`,
                    );

                    // console.log('fileContents');
                    // console.log(fileContents);
                }
                // else {
                //     console.log('not path');
                //     console.log(file.relative);
                // }
            });

            file.contents = Buffer.from(fileContents, encoding);
        }

        callback(undefined, file);
    });

    return stream;
};
