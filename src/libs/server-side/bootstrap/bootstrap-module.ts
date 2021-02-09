import { Module, Global, OnModuleInit } from '@nestjs/common';
import { ServerSideConfigService } from '../services/config-service';

declare let global: any;

@Global()
@Module({
    providers: [ServerSideConfigService],
    controllers: [], // faq
    exports: [ServerSideConfigService],
})
export default class bootstrapModule implements OnModuleInit {
    root: string;

    onModuleInit() {
        this.root = 'bootstrap module';
        // global.root = 'bootstrap module';
    }
}
