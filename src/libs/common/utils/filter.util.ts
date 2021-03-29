function filterEmptyProperty(obj: { [key: string]: string | number | boolean }) {
    const newObj = {};

    if (!obj) {
        return newObj;
    }

    Object.keys(obj).forEach((k) => {
        if (typeof obj[k] !== 'undefined' && obj[k] !== null && obj[k]?.toString()?.length > 0) {
            newObj[k] = obj[k];
        }
    });

    return newObj;
}

export { filterEmptyProperty };
