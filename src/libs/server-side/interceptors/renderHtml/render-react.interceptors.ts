/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import PAGE_NAME_METADATA from '@libs/server-side/reflect/metadata';
import { createHtml } from '@libs/server-side/render';
import { ControllerMethod, RenderOption } from '@libs/server-side/types';
import { FastifyReply } from 'fastify';

@Injectable()
export default class RenderReactInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const element = (context.getHandler() as ControllerMethod).RootReactElement;
        if (!element) {
            return next.handle();
        }

        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse() as FastifyReply;
        const pageName = Reflect.getMetadata(PAGE_NAME_METADATA, context.getHandler());

        const options: RenderOption = {
            rootElement: element,
            pageName,
            request,
            reply: response,
        };

        // set to be html
        response.header('Content-Type', 'text/html;charset=UTF-8');

        return createHtml(next.handle(), options);
    }
}
