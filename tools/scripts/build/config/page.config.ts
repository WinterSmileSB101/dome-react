/* eslint-disable import/prefer-default-export */
import path from 'path';
import { PageAlias, PageMapping, ModuleRoot } from './config.type';

export default {
    [PageAlias.HomeHome]: path.join(ModuleRoot.home, 'pages/view/home-page.client.tsx'),
    // [PageAlias.HomeApp]: path.join(ModuleRoot.home, 'app.tsx'),
} as PageMapping;
