import React, { FC } from 'react';
import { WindowScript } from './detailTag/window-script';

interface HtmlBodyProps {
    rootId?: string;
    initData: any;
}

const HtmlBody: FC<HtmlBodyProps> = (props) => {
    const { rootId = 'app' } = props;

    return (
        <body>
            {/* init data from client */}
            <div>
                <WindowScript propertyName="initData" content={props?.initData || {}} />
            </div>
            <div id={rootId}>{props.children}</div>
        </body>
    );
};

HtmlBody.displayName = 'HtmlBody';

export default { HtmlBody };
