import { PageAlias } from '../../../../src/libs/common/constants';
import { PageResourceMapping } from './config.type';

export const ResourceNotBuildInMapping = ['vendors'];

// if no client side ,check if is need vendor(react)
export default {
    [PageAlias.HomeHome]: { scripts: { vendors: true } },
    [PageAlias.DemonMInfo]: { scripts: { vendors: true } },
} as PageResourceMapping;
