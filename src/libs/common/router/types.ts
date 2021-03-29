export type RouteOptions = {
    page: string;
    params?: { [key: string]: string };
};

export enum Domain {
    MainSite = 'MainSite',
}

export type Protocol = 'http' | 'https';
