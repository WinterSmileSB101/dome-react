import del from 'delete';

function clean(done) {
    del(['dist/**/*']);
    done();
}

exports.clean = clean;
