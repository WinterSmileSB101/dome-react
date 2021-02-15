import { AxiosResponse } from 'axios';

interface IRestClient {
    addHeader(key: string, value: string): IRestClient;
    send<T>(params: { [key: string]: string }): AxiosResponse<T>;
}

export { IRestClient };
