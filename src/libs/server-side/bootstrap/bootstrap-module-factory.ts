import { DynamicModule, Type } from '@nestjs/common';
import { castArray } from 'lodash';

import bootstrapModule from './bootstrap-module';

export default class BootstrapModuleFactory {
    public static create(modules: Type<any> | Array<Type<any>>): DynamicModule {
        return {
            module: bootstrapModule,
            imports: [...castArray(modules)],
            providers: [],
        };
    }
}
