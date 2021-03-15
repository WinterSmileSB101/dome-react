import React, { FC } from 'react';
import { WindowScript, WindowScriptProperties } from './detailTag/window-script';

interface HtmlBodyProperties {
    rootId?: string;
    initData: any;
    windowScripts?: WindowScriptProperties[];
}

const HtmlBody: FC<HtmlBodyProperties> = (props) => {
    const { rootId = 'app' } = props;

    return (
        <body>
            {/* init data from client */}
            <div>
                <WindowScript propertyName="initData" content={props?.initData || {}} />
                {/* Other scripts */}
                {props.windowScripts?.length > 0 &&
                    props.windowScripts?.map((script, i) => (
                        <WindowScript key={`${script?.propertyName}_${i}`} {...script} />
                    ))}
            </div>
            <div id={rootId}>{props.children}</div>
        </body>
    );
};

HtmlBody.displayName = 'HtmlBody';

export default { HtmlBody };
