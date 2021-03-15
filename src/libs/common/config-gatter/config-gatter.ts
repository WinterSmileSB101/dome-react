// import { Injectable } from '@nestjs/common';
import { readJsonSync, existsSync } from 'fs-extra';
import path from 'path';
import { EnvironmentParameters, getEnv } from '../enviroment';
// import { readFileSync } from '../file-opreater';
import { Appsettings } from '../modules/config.type';

function merge(fromConfig: any, toConfig: any) {
    const newConfig = { ...fromConfig };

    if (!!fromConfig && !!toConfig) {
        // this will replace all match key without care depth
        Object.keys(toConfig)?.forEach((key) => {
            newConfig[key] = toConfig[key];
        });
    }

    return newConfig;
}

function getConfig(name: string, specialPath: string, env: 'dev' | 'prod'): any {
    try {
        const baseFile = readJsonSync(path.join(specialPath, name));
        const commonFile = baseFile?.default ?? baseFile;
        const additionFilePath = path.join(specialPath, env, name);

        if (existsSync(additionFilePath)) {
            const additionFile = additionFilePath?.length > 0 && readJsonSync(additionFilePath)?.default;

            return merge(commonFile, additionFile);
        }
        return commonFile;
    } catch (error) {
        console.log('get config:', name, 'Error:', error);
        return {};
    }
}

export class ConfigGatter {
    private readonly env: 'dev' | 'prod';

    private readonly rootPath: string;

    private readonly appsettings: Appsettings;

    constructor() {
        this.env = getEnv(EnvironmentParameters.RUN_ENV) === 'prod' ? 'prod' : 'dev';
        this.rootPath = getEnv(EnvironmentParameters.ROOT_PATH) || '';
        console.log('env', this.env);
        this.appsettings = getConfig('appsettings.json', path.join(this.rootPath, './conf'), this.env); // app setting are no remote
    }

    public getAppsettings() {
        return this.appsettings;
    }

    public getConfig<T = any>(configName: string): T {
        return getConfig(
            `${configName}${configName?.trim()?.endsWith('.json') ? '' : '.json'}`,
            path.join(this.rootPath, './conf'),
            this.env,
        ) as T;
    }
}
