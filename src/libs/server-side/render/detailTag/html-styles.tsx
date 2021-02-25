import React, { FC } from 'react';

interface HtmlStyleProps {
    // tagType: 'style' | 'script';
    type: 'link' | 'inner';

    src?: string;
    innerContent?: string;

    props?: { [key: string]: string | boolean | number };
}

const HtmlStyle: FC<HtmlStyleProps> = (props) => (
    <>
        {props?.type === 'link' && <link rel="stylesheet" href={props.src} {...props.props} />}
        {props?.type === 'inner' && <style dangerouslySetInnerHTML={{ __html: props.innerContent }} />}
    </>
);

export { HtmlStyleProps, HtmlStyle };
