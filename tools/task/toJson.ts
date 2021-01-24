import through2 from 'through2';

export const toJSON = through2.obj(function (blob, encoding, cb) {
    const [filePath] = blob.history;

    delete require.cache[require.resolve(filePath)];

    try {
        blob.contents = Buffer.from(JSON.stringify(require(filePath), null, 2));
        blob.path = filePath.substr(0, filePath.lastIndexOf('.')) + '.json';

        this.push(blob);
    } catch (e) {
        this.emit('error', e);
    }
    cb();
});
