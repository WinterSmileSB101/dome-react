import { trim, remove } from 'lodash';
import { compile } from 'path-to-regexp';
import { filterEmptyProperty } from '../utils/filter.util';
import { PathBuilderFunction, getCompiler, Segments } from '../utils/route.util';

import { IRouterBuilder } from './router-builder.interfaces';
import { Protocol } from './types';

export type RouterParamter = { [key: string]: string | number | boolean };

export type RouterOption = {
    hash: string;
    encode: boolean;
};

export class RouteBuilder implements IRouterBuilder {
    protected readonly host: string;

    protected readonly defaultOptions: RouterOption;

    protected protocol: Protocol;

    protected path: string;

    protected builder: PathBuilderFunction;

    protected segments: Segments;

    constructor(host: string) {
        this.defaultOptions = {
            hash: '',
            encode: false,
        };
        this.host = trim(host, '/');
        this.path = '';
        this.protocol = 'https';
    }

    setProtocol(protocol: Protocol): IRouterBuilder {
        this.protocol = protocol;

        return this;
    }

    setPath(path: string): IRouterBuilder {
        this.path = trim(path, '/');

        const { pathBuilderFunc, segments } = getCompiler(this.path);

        this.builder = pathBuilderFunc;
        this.segments = segments;

        return this;
    }

    build(parameters: RouterParamter, options?: RouterOption): string {
        if ((this.host?.length ?? -1) <= 0) {
            throw new Error('host is null');
        }

        if ((this.path?.length ?? -1) <= 0) {
            throw new Error('path is null');
        }

        const validParameters = filterEmptyProperty(parameters);

        let uri = '';
        try {
            uri = this.builder({ ...validParameters });
        } catch (error) {
            throw new Error(`In RouteBuilder, when build path:[${this.path}] catch error. \r\nerror is ${error}`);
        }

        const finalOptions = { ...this.defaultOptions, ...options };

        if (finalOptions?.hash?.length > 0 && !finalOptions?.hash?.startsWith('#')) {
            throw new Error("hash value need start with '#'");
        }

        const finalParameters = this.removedSegmentsParameters(validParameters);

        const wholeQueryString = Object.keys(finalParameters)?.reduce((rcc, parameter, i) => {
            const value = finalParameters[parameter];

            // if (!!value) {
            rcc += `${i === 0 ? '?' : '&'}${parameter}=${
                finalOptions?.encode ? encodeURIComponent(value)?.replace(/%20/g, '+') : value
            }`;
            // }
            return rcc;
        }, '');

        return `${this.protocol}://${this.host}${uri}${wholeQueryString?.length > 0 ? `${wholeQueryString}` : ''}${
            finalOptions?.hash ?? ''
        }`;
    }

    private removedSegmentsParameters(parameters: RouterParamter) {
        const parametersSet2Undefined = this.segments?.reduce((rcc, key) => {
            rcc[key] = undefined;

            return rcc;
        }, {});

        return filterEmptyProperty({ ...parameters, ...parametersSet2Undefined });
    }

    // public build(options: RouteOptions): string {
    //     if (!options) {
    //         throw new Error("option can't be null.");
    //     }

    //     const params = mapObject2KVArray(options?.params);

    //     const path = options?.page;

    //     const tailPath = params.join('&');

    //     return `${trimEnd(this.domain, '/')}/${trimEnd(trimEnd(trimStart(path?.trim(), '/'), '/'), '?')}?${tailPath}`;
    // }
}
