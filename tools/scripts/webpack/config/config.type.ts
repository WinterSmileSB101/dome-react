export enum ModuleRoot {
    home = './src/modules/home',
}

export type PageMapping = {
    [key: string]: string;
};

export type PageMappingConfig = {
    name: string;
    path: string;
};

export type PageResource = { vendors?: boolean; [key: string]: boolean };

export type PageResourceMapping = {
    [key: string]: { scripts?: PageResource; styles?: PageResource };
};
