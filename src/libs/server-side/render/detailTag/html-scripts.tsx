import React, { FC } from 'react';

interface HtmlScriptProps {
    type: 'linkScript' | 'innerScript';

    src?: string;
    innerScript?: string;

    props?: { [key: string]: string };
}

const HtmlScript: FC<HtmlScriptProps> = (props) => (
    <>
        {props?.type === 'linkScript' && <script src={props.src} />}
        {props?.type === 'innerScript' && <script dangerouslySetInnerHTML={{ __html: props.innerScript }} />}
    </>
);

export { HtmlScriptProps, HtmlScript };
