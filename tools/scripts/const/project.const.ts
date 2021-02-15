import path from 'path';

// eslint-disable-next-line no-shadow
export enum EnvironmentAlias {
    nodeEnvironment = 'NODE_ENV',
}

const IS_DEV = process.env.NODE_ENV === 'development';

const PROJECT_PATH = path.resolve(__dirname, '../../../');
const PROJECT_NAME = path.parse(PROJECT_PATH).name;

const STATIC_PATH_PRD = 'https://gitee.com/SmileSB101/dome-react-static/tree/with-static-resource/static';
const STATIC_PATH_DEV = 'http://localhost:9627/';

export default {
    IS_DEV,
    PROJECT_PATH,
    STATIC_PATH_DEV,
    STATIC_PATH_PRD,
};
