import { EnvironmentParameters, getEnv } from '@libs/common/enviroment';
import { SiteConfig } from '@libs/common/modules';
import { RenderModel } from '@libs/server-side/types';
import { trimEnd } from 'lodash';

const addHeader = (result: RenderModel): RenderModel => {
    const siteConfig = result.renderOption.configGatter('site-config') as SiteConfig;

    const host = trimEnd(siteConfig.staticPath, '/');
    result.headerData = {
        staticPath: host,
        icon: `${host}/assets/${siteConfig.favicon}`,
        sloganLogo: `${host}/assets/${siteConfig.headerLogo}`,
    };

    return result;
};

export { addHeader };
