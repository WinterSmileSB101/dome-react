import { ModuleMetadata } from '@nestjs/common';
import fastify from 'fastify';
import metricsPlugin from 'fastify-metrics';
import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify';
import { NestFactory } from '@nestjs/core';

import { BootstrapOptions } from './bootstrap.interfaces';

export default async function bootstrap(rootModule: ModuleMetadata, options?: BootstrapOptions) {
    const fastifyInstance = fastify({
        ignoreTrailingSlash: true,
        caseSensitive: false,
    });

    fastifyInstance.register(metricsPlugin, { endpoint: '/metrics' });

    fastifyInstance.addHook('onSend', (request, reply, payload, done) => {
        reply.header('s-site-id', 'default');
        done(undefined, payload);
    });

    const app = await NestFactory.create<NestFastifyApplication>(rootModule, new FastifyAdapter());

    const port = options?.port || 8231;

    await app.listen(port, (err, address) => {
        console.log(`server are running on ${address}`);
    });
}
