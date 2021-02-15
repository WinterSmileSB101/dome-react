import { PageAlias } from '@libs/common';
import { ReactRootView } from '@libs/server-side/decorators/render';
import { RenderReactInterceptor } from '@libs/server-side/interceptors';
import { ServerSideConfigService } from '@libs/server-side/services/config-service';
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import HomeView from '../pages/view/home-page.server';

@Controller()
@UseInterceptors(RenderReactInterceptor)
export default class HomePageController {
    // eslint-disable-next-line no-useless-constructor
    constructor(private readonly serverSideConfig: ServerSideConfigService) {}

    @ReactRootView(HomeView, PageAlias.HomeHome)
    @Get('home')
    public async Home() {
        console.log(process.env.ROOT_PATH);
        // this.serverSideConfig.get();
        return '55555555555';
    }
}
