import { PageAlias } from '../../../../src/libs/common';
import { PageResourceMapping } from './config.type';

export const ResourceNotBuildInMapping = ['vendors'];

export default {
    [PageAlias.HomeHome]: { scripts: { vendors: true } },
} as PageResourceMapping;
