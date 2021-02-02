import { ComponentType } from 'react';
import { FastifyReply, FastifyRequest } from 'fastify';

// eslint-disable-next-line @typescript-eslint/ban-types
type ControllerMethod = Function & {
    RootReactElement: ComponentType;
};

type RenderOption = {
    rootElement: ComponentType;
    pageName: string;
    request: FastifyRequest<any>;
    reply: FastifyReply<any>;
};

type RenderModel = {
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
