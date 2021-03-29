/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Get, UseInterceptors } from '@nestjs/common';

import { PageAlias, PagePathMapping } from '@libs/common/constants';
import { ReactRootView } from '@libs/server-side/decorators/render';
import { RenderReactInterceptor } from '@libs/server-side/interceptors';
import { ServerSideConfigService } from '@libs/server-side/services/config-service';

import { HomeView } from '../views/home-page.server';

@Controller()
@UseInterceptors(RenderReactInterceptor)
export default class HomePageController {
    // eslint-disable-next-line no-useless-constructor
    constructor(private readonly serverSideConfig: ServerSideConfigService) {}

    @ReactRootView(HomeView, PageAlias.HomeHome)
    @Get(PagePathMapping[PageAlias.HomeHome]?.path)
    public async Home() {
        console.log(process.env.ROOT_PATH);
        // this.serverSideConfig.get();
        return '55555555555';
    }
}
