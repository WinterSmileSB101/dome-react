import { RenderModel } from '@libs/server-side/types';

const addScripts = (result: RenderModel): RenderModel => {
    const scriptsMapping = result.renderOption.configGatter('scripts.mapping');

    result.injectedScripts = Object.keys(scriptsMapping)
        .filter((key) => [result.renderOption.pageName].includes(key))
        .map((key) => {
            const script = scriptsMapping[key];
            const scriptUrl = script?.js ?? script;

            return { src: scriptUrl, type: 'linkScript' };
        });

    return result;
};

export { addScripts };
