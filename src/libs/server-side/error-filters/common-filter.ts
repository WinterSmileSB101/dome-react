import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import ServerSideRenderError from '../render/error/ssr-error';
import { SSRErrorRender } from '../render/ssr-error-render';
import { ErrorArgument } from '../types';

@Catch()
export class CommonExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const request = context.getRequest() as FastifyRequest;
        const response = context.getResponse() as FastifyReply;

        const args: ErrorArgument = { exception, request, response };

        if (exception instanceof ServerSideRenderError) {
            SSRErrorRender(args);
        }
    }
}
