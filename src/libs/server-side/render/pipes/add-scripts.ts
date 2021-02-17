import { isArray } from 'lodash';
import { RenderModel } from '@libs/server-side/types';

const addScripts = (result: RenderModel): RenderModel => {
    const scriptsMapping = result.renderOption.configGatter('resources.mapping');
    result.injectedScripts = [];

    Object.keys(scriptsMapping)
        .filter((key) => [result.renderOption.pageName].includes(key))
        .forEach((key) => {
            const script = scriptsMapping[key];

            if (isArray(script?.js)) {
                // link script
                script.js.forEach((j: string) => {
                    result.injectedScripts.push({
                        src: j,
                        type: 'linkScript',
                        props: { async: !!j?.includes(result.renderOption?.pageName) }, // if is this page,we need async to load.
                    });
                });
            } else {
                // inner script
                result.injectedScripts.push({ innerScript: script.js, type: 'innerScript' });
            }
        });

    return result;
};

export { addScripts };
