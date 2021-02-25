import { isArray } from 'lodash';
import { RenderModel } from '@libs/server-side/types';

const addStyles = (result: RenderModel): RenderModel => {
    const stylesMapping = result.renderOption.configGatter('resources.mapping');
    result.injectedStyles = [];

    Object.keys(stylesMapping)
        .filter((key) => [result.renderOption.pageName].includes(key))
        .forEach((key) => {
            const style = stylesMapping[key];

            if (isArray(style?.css)) {
                // link style
                style.css.forEach((j: string) => {
                    result.injectedStyles.push({
                        src: j,
                        type: 'link',
                        props: { async: !!j?.includes(result.renderOption?.pageName) }, // if is this page,we need async to load.
                    });
                });
            } else {
                // inner style
                result.injectedStyles.push({ innerContent: style.js, type: 'inner' });
            }
        });

    return result;
};

export { addStyles };
