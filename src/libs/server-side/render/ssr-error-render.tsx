import { FastifyReply } from 'fastify';
import React, { ComponentType } from 'react';
import { renderToString } from 'react-dom/server';
import { ErrorArgument } from '../types';
import { HtmlSSRError } from './error';

const html5Header = '<!DOCTYPE html>';

const renderString = <T extends unknown>(Inner: ComponentType, props: T) =>
    html5Header + renderToString(<Inner {...props} />);

const ErrorRender = (reply: FastifyReply, statusCode: number, htmlString: string) =>
    reply.status(statusCode).header('content-type', 'text/html').send(htmlString);

export const SSRErrorRender = (args: ErrorArgument) =>
    ErrorRender(args.response, 500, renderString(HtmlSSRError, { exception: args.exception }));
