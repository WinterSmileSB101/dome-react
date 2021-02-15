import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

class RestClient {
    private readonly baseConfig: AxiosRequestConfig;

    private readonly apiInstance: AxiosInstance;

    constructor(config: AxiosRequestConfig) {
        this.baseConfig = {
            timeout: 5000,
            ...config,
        };
        this.apiInstance = Axios.create(this.baseConfig);
    }

    private addBeforeRequestInterceptor() {
        // this.apiInstance.interceptors.request.use()
    }
}

export { RestClient };
