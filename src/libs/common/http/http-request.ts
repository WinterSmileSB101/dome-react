import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

class HttpRequest {
    static create(config: AxiosRequestConfig): AxiosInstance {
        const baseConfig = {
            timeout: 5000,
            ...config,
        };

        const request = Axios.create({ ...baseConfig });

        return request;
    }
}

export { HttpRequest };
