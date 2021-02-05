import React, { FC } from 'react';

interface HtmlMetaProps {
    name: string;
    content: string;

    props?: { [key: string]: string };
}

const HtmlMeta: FC<HtmlMetaProps> = (props) =>
    props?.content?.length > 0 &&
    props?.name?.length > 0 && <meta name={props.name} content={props.content} {...props.props} />;

export { HtmlMeta };

export default {};
