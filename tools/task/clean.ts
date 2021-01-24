import { isArray, isFunction } from 'lodash';
import del from 'delete';
import { remove } from 'fs-extra';

function cleanDist(done) {
    del(['dist/**/*']);
    done();
}

const cleanDir = (dir: string | string[]) => (done?) => {
    if (isArray(dir)) {
        dir?.forEach((d) => remove(d));
    } else {
        remove(dir);
    }

    if (isFunction(done)) {
        done();
    }
};

export { cleanDir, cleanDist };
