import { EnvironmentParameters, getEnv } from '@libs/common/enviroment';
import { RenderModel } from '@libs/server-side/types';
import { trimEnd } from 'lodash';

const addHeader = (result: RenderModel): RenderModel => {
    result.headerOption = {
        icon: `${trimEnd(getEnv(EnvironmentParameters.ROOT_STATIC_HOST), '/')}/assets/favicon.ico`,
    };

    return result;
};

export { addHeader };
