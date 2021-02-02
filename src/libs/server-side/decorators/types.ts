import { ComponentType } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
export type ControllerMethod = Function & {
    RootReactElement: ComponentType;
};
