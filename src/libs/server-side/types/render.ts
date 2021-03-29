import { ComponentType } from 'react';
import { FastifyReply, FastifyRequest } from 'fastify';

import { ConfigGatter } from '@libs/common/config-gatter';
import { HtmlScriptProps } from '../render/detailTag/html-scripts';
import { HtmlStyleProps } from '../render/detailTag/html-styles';
import { WindowScriptProperties } from '../render/detailTag/window-script';

// eslint-disable-next-line @typescript-eslint/ban-types
type ControllerMethod = Function & {
    RootReactElement: ComponentType;
};

type HeaderOption = {
    icon: string;
    sloganLogo?: string;
    staticPath?: string;
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

    windowScripts?: WindowScriptProperties[];
    injectedScripts?: HtmlScriptProps[];
    injectedStyles?: HtmlStyleProps[];

    controllerResult: any;
    renderOption: RenderOption;
    headerData?: HeaderOption;
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

export { ControllerMethod, RenderOption, RenderModel, SEO, Meta, HeaderOption };
