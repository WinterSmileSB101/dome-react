import React, { FC } from 'react';

interface HtmlBodyProps {
    rootId?: string;
}

const HtmlBody: FC<HtmlBodyProps> = (props) => {
    const { rootId = 'app' } = props;

    return (
        <body>
            <div id={rootId}>{props.children}</div>
        </body>
    );
};

HtmlBody.displayName = 'HtmlBody';

export default { HtmlBody };
