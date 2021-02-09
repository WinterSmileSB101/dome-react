import { ModuleMetadata } from '@nestjs/common';
import fastify from 'fastify';
import metricsPlugin from 'fastify-metrics';
import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify';
import { NestFactory } from '@nestjs/core';

import { EnvironmentParameters, getEnv, setEnv } from '@libs/common/Enviroment';
import { BootstrapOptions } from './bootstrap.interfaces';
import { CommonExceptionFilter } from '../error-filters';

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

    setEnv(EnvironmentParameters.RUN_ENV, getEnv('NODE_ENV') === 'prod' ? 'prod' : 'dev');
    setEnv(EnvironmentParameters.ROOT_PATH, options?.rootDir);

    const app = await NestFactory.create<NestFastifyApplication>(rootModule, new FastifyAdapter());

    app.useGlobalFilters(new CommonExceptionFilter());

    const port = options?.port || 8231;

    await app.listen(port, (err, address) => {
        console.log('env:', getEnv(EnvironmentParameters.RUN_ENV));
        console.log('rootPath:', getEnv(EnvironmentParameters.ROOT_PATH));

        console.log(`server are running on ${address}`);
    });
}
