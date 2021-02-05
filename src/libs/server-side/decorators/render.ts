import { PATH_METADATA } from '@nestjs/common/constants';
import { ComponentType } from 'react';

import { ControllerMethod } from '../types';
import METADATA from '../reflect/metadata';

function ReactRootView(rootElement: ComponentType, pageName: string) {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        // console.log('shishi:', Reflect.getMetadata(PATH_METADATA, descriptor.value));
        Reflect.defineMetadata(METADATA.PAGE_NAME_METADATA, pageName, descriptor.value);
        (descriptor.value as ControllerMethod).RootReactElement = rootElement;
    };
}

export { ReactRootView };
