export interface BootstrapOptions {
    port?: number;
    rootDir?: string;
    rootStaticHost?: string; // default is process.env.ROOT_STATIC_HOST
}
