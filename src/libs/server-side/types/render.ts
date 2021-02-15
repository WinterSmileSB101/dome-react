import { ConfigGatter } from '@libs/common/config-gatter';
import { ComponentType } from 'react';
import { FastifyReply, FastifyRequest } from 'fastify';
import { HtmlScriptProps } from '../render/detailTag/html-scripts';

// eslint-disable-next-line @typescript-eslint/ban-types
type ControllerMethod = Function & {
    RootReactElement: ComponentType;
};

type RenderOption = {
    configGatter: (configName: string) => any;
    rootElement: ComponentType;
    pageName: string;
    request: FastifyRequest<any>;
    reply: FastifyReply<any>;
};

type RenderModel = {
    metaList?: Meta[];
    injectedScripts?: HtmlScriptProps[];
    controllerResult: any;
    renderOption: RenderOption;
};

type Meta = {
    name: string;
    value: string;
};

type Robots = {
    enable: boolean;
};

type SEO = {
    title?: string;
    keywords?: string;
    description?: string;
    robots?: Robots;
};

export { ControllerMethod, RenderOption, RenderModel, SEO, Meta };
