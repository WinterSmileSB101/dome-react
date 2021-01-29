import { ComponentType } from 'react';

export type ControllerMethod = Function & {
    RootReactElement: ComponentType;
};
