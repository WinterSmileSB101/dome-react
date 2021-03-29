export type Appsettings = {
    projectConfig: ProjectConfig;

    remoteConfig?: {
        enable: boolean;
        repoName: string;
        repoAddress?: string;
    };

    configs?: Configs;
};

export type ProjectConfig = {
    rootPath: string;
    publishPath?: string;
    serverPath?: string;
};

export type ConfigContent = {
    path: string;
    type: 'json' | 'xml';
};

export type Configs = {
    [key: string]: ConfigContent;
};

export type CommonConfig = {
    staticAddress?: string;
};

export type DomainConfig = {
    baseDomain: string;
};

export type SiteConfig = {
    domain: {
        [key: string]: string;
    };

    staticPath: string;
    favicon: string;
    headerLogo: string;
};
