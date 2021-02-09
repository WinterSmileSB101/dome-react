import path from 'path';
import { Appsettings } from '../src/libs/common/modules/config.type';

const appsetting: Appsettings = {
    projectConfig: {
        rootPath: path.join(__dirname, '..'),
        publishPath: 'dist',
        serverPath: 'server',
        staticPath: 'static',
    },
    configs: {
        common: {
            path: 'CommonConfig',
            type: 'json',
        },
    },
};

export default appsetting;
