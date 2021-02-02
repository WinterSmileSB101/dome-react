import { Module, Global, OnModuleInit } from '@nestjs/common';

declare let global: any;

@Global()
@Module({
    providers: [],
    controllers: [], // faq
    exports: [],
})
export default class bootstrapModule implements OnModuleInit {
    root: string;

    onModuleInit() {
        this.root = 'bootstrap module';
        // global.root = 'bootstrap module';
    }
}
