import { ReactRootView } from '@libs/server-side/decorators/render';
import { RenderReactInterceptor } from '@libs/server-side/interceptors';
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import HomeView from '../pages/view/home-page.server';

@Controller()
@UseInterceptors(RenderReactInterceptor)
export default class HomePageController {
    @ReactRootView(HomeView, '')
    @Get('home')
    public async Home() {
        return '55555555555';
    }
}
