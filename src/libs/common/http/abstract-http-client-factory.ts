import { IRestClient } from './interfaces';

abstract class AbstractHttpClientFactory {
    public abstract createResquest(apiName: string): IRestClient;

    public create(apiName: string): IRestClient {
        return this.createResquest(apiName);
    }
}

export { AbstractHttpClientFactory };
