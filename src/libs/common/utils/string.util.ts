const trimStart = (str: string, replacedStr?: string) => {
    if (replacedStr?.trim()?.length > 0) {
        if (str?.startsWith(replacedStr)) {
            return str.slice(replacedStr.length);
        }
    } else {
        return str?.trim();
    }

    return str;
};

export default { trimStart };
