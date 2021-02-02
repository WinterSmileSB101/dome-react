const AniEasing = {
    linear(p) {
        return p;
    },
    swing(p) {
        // console.log(`percent:${p}`);
        const next = 0.5 - Math.cos(p * Math.PI) / 2;

        // console.log(`next ${next}`);
        return next;
    },
    _default: 'swing',
};

export default { AniEasing };
