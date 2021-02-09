const setEnv = (key: string, value: any) => {
    if (key?.length <= 0) {
        return;
    }

    process.env[key?.toUpperCase()] = value;
};

const getEnv = (key: string) => {
    if (key?.length <= 0) {
        return;
    }

    return process.env[key?.toUpperCase()];
};

export { setEnv, getEnv };

export * from './constants';
