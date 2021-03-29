import { Protocol } from './types';

export interface IRouterBuilder {
    setProtocol(protocol: Protocol): IRouterBuilder;
    setPath(path: string): IRouterBuilder;
    build(parameters: { [key: string]: string | boolean | number }): string;
}
