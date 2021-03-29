function mapObject2KVArray(obj: { [key: string]: string }, isRemoveEmpty = false) {
    const resultArray = [];

    if (!obj) {
        return resultArray;
    }

    Object.keys(obj).forEach((key) => {
        const value = obj[key];

        if (!isRemoveEmpty || (isRemoveEmpty && value?.length > 0)) {
            resultArray.push(`${key}=${value}`);
        }
    });

    return resultArray;
}

export { mapObject2KVArray };
