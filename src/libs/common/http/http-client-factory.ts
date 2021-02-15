import { Injectable, Scope } from '@nestjs/common';
import { ConfigGatter } from '../config-gatter/config-gatter';
import { AbstractHttpClientFactory } from './abstract-http-client-factory';
import { HttpRequest } from './http-request';
import { IRestClient } from './interfaces';

@Injectable({ scope: Scope.REQUEST })
class NodeHttpClient extends AbstractHttpClientFactory {
    constructor(private configGatter: ConfigGatter) {
        super();
    }

    public createResquest(apiName: string): IRestClient {
        const apiConfig = this.configGatter.getConfig('test');

        // const request = HttpRequest.create();

        // eslint-disable-next-line unicorn/no-null
        return null;
    }
}
