/* eslint-disable import/prefer-default-export */
import path from 'path';
import { PageAlias } from '../../../../src/libs/common/constants';
import { PageMapping, ModuleRoot } from './config.type';

export default {
    [PageAlias.HomeHome]: path.join(ModuleRoot.home, 'views/home-page.client.tsx'),

    // demon module
    [PageAlias.DemonMInfo]: path.join(ModuleRoot.demon, 'views/machine-info-page.client.tsx'),
    // [PageAlias.HomeApp]: path.join(ModuleRoot.home, 'app.tsx'),
} as PageMapping;
