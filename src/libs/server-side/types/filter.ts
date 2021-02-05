import { FastifyRequest, FastifyReply } from 'fastify';

export type ErrorArgument = {
    exception: any;
    request: FastifyRequest;
    response: FastifyReply;
};
