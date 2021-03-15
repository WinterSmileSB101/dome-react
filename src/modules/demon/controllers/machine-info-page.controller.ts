import { PageAlias } from '@libs/common/constants';
import { ReactRootView } from '@libs/server-side/decorators/render';
import { RenderReactInterceptor } from '@libs/server-side/interceptors';
import { ServerSideConfigService } from '@libs/server-side/services/config-service';
import { getSystemInfo } from '@libs/server-side/utils';
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { MachineInfoView } from '../views/machine-info-page.server';

@Controller('demon')
@UseInterceptors(RenderReactInterceptor)
export default class MachineInfoController {
    // eslint-disable-next-line no-useless-constructor
    constructor(private readonly serverSideConfig: ServerSideConfigService) {}

    @ReactRootView(MachineInfoView, PageAlias.DemonMInfo)
    @Get('minfo')
    public async MachineInfo() {
        // this.serverSideConfig.get();
        return { initData: { a: '12', b: 456, c: true, systemInfo: getSystemInfo() } };
    }
}
