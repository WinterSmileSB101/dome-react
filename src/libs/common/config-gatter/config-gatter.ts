import { readJsonSync, existsSync } from 'fs-extra';
import path from 'path';
import { EnvironmentParameters, getEnv } from '../Enviroment';
import { readFile, readFileSync } from '../file-opreater';
import { Appsettings } from '../modules/config.type';

function merge(fromConfig: any, toConfig: any) {
    const newConfig = { ...fromConfig };

    if (!!fromConfig && !!toConfig) {
        Object.keys(toConfig)?.forEach((key) => {
            fromConfig[key] = toConfig[key];
        });
    }

    return newConfig;
}

function getConfig(name: string, specialPath: string, env: 'dev' | 'prod'): any {
    try {
        const baseFile = readJsonSync(path.join(specialPath, name))?.default;
        const additionFilePath = path.join(specialPath, env, name);

        if (existsSync(additionFilePath)) {
            const additionFile = additionFilePath?.length > 0 && readFileSync(additionFilePath);
            return merge(baseFile, additionFile);
        }
        return baseFile;
    } catch (error) {
        console.log('get config:', name, 'Error:', error);
        return {};
    }
}

export default class ConfigGatter {
    private readonly env: 'dev' | 'prod';

    private readonly rootPath: string;

    private readonly appsettings: Appsettings;

    constructor() {
        this.env = getEnv(EnvironmentParameters.RUN_ENV) === 'prod' ? 'prod' : 'dev';
        this.rootPath = getEnv(EnvironmentParameters.ROOT_PATH) || '';
        this.appsettings = getConfig('appsettings.json', path.join(this.rootPath, './conf'), this.env); // app setting are no remote
    }

    public getAppsettings() {
        console.log(getEnv(EnvironmentParameters.ROOT_PATH));
    }
}
