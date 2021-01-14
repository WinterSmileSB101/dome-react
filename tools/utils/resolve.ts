import path from 'path';

function resolve(dir: string) {
    return path.join(__dirname, '../../', dir);
}

export { resolve };
