const trimStart = (str: string, replacedStr?: string) => {
    if (replacedStr?.trim()?.length > 0) {
        if (str?.startsWith(replacedStr)) {
            return str.substring(replacedStr.length);
        }
    } else {
        return str?.trim();
    }

    return str;
};

export { trimStart };
