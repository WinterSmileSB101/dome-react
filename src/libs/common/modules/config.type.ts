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
    staticPath?: string;
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
    favicon: string;
    headerLogo: string;
};
