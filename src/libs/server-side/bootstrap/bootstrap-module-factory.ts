import { Module, DynamicModule, Global, OnModuleInit, Type } from '@nestjs/common';
import { castArray } from 'lodash';

declare let global: any;

@Global()
@Module({
    providers: [],
    controllers: [], //faq
    exports: [],
})
class bootstrapModule implements OnModuleInit {
    onModuleInit() {
        global.root = 'bootstrap module';
    }
}

export class BootstrapModuleFactory {
    public static create(modules: Type<any> | Array<Type<any>>): DynamicModule {
        return {
            module: bootstrapModule,
            imports: [...castArray(modules)],
        };
    }
}
