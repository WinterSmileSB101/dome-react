import { ConfigGatter } from '@libs/common/config-gatter';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ServerSideConfigService {
    private readonly configGatter: ConfigGatter;

    constructor() {
        this.configGatter = new ConfigGatter();
    }

    public get(configName: string): any {
        return this.configGatter.getConfig(configName);
    }
}
