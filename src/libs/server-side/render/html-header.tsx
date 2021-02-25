import React, { FC } from 'react';

import { Meta, SEO } from '../types';
import { HtmlMeta } from './detailTag/html-meta';
import { HtmlScript, HtmlScriptProps } from './detailTag/html-scripts';
import { HtmlStyle, HtmlStyleProps } from './detailTag/html-styles';

interface HeadProps {
    seo?: SEO;
    metaList?: Array<Meta>;
    injectedScripts: Array<HtmlScriptProps>;
    injectedStyles: Array<HtmlStyleProps>;
}

const HtmlHead: FC<HeadProps> = (props) => (
    <head>
        {props?.seo?.title?.length > 0 && <title>{props?.seo?.title}</title>}
        <HtmlMeta name="keywords" content={props?.seo?.keywords} />
        <HtmlMeta name="description" content={props?.seo?.description} />
        <HtmlMeta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui" />

        {/* other meta tags */}
        {props.metaList?.length > 0 &&
            props.metaList.map((meta, index) => (
                <HtmlMeta key={`header_meta_${index}`} name={meta.name} content={meta.value} />
            ))}

        {/* script tags */}
        {props.injectedScripts?.length > 0 &&
            props.injectedScripts.map((script, index) => (
                <HtmlScript
                    key={`header_scripts_${index}`}
                    type={script.type}
                    src={script.src}
                    innerScript={script.innerScript}
                    props={script.props}
                />
            ))}

        {/* style tags */}
        {props.injectedStyles?.length > 0 &&
            props.injectedStyles.map((style, index) => (
                <HtmlStyle
                    key={`header_style_${index}`}
                    type={style.type}
                    src={style.src}
                    innerContent={style.innerContent}
                    props={style.props}
                />
            ))}
    </head>
);

HtmlHead.displayName = 'HtmlHead';

export { HtmlHead, HeadProps };
