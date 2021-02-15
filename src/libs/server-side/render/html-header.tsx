import React, { FC } from 'react';

import { Meta, SEO } from '../types';
import { HtmlMeta } from './detailTag/html-meta';
import { HtmlScript, HtmlScriptProps } from './detailTag/html-scripts';

interface HeadProps {
    Seo?: SEO;
    MetaList?: Array<Meta>;
    InjectedScripts: Array<HtmlScriptProps>;
}

const HtmlHead: FC<HeadProps> = (props) => {
    console.log(props);
    return (
        <head>
            {props?.Seo?.title?.length > 0 && <title>{props?.Seo?.title}</title>}
            <HtmlMeta name="keywords" content={props?.Seo?.keywords} />
            <HtmlMeta name="description" content={props?.Seo?.description} />
            <HtmlMeta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui" />

            {/* other meta tags */}
            {props.MetaList?.length > 0 &&
                props.MetaList.map((meta, index) => (
                    <HtmlMeta key={`header_meta_${index}`} name={meta.name} content={meta.value} />
                ))}

            {/* script tags */}
            {props.InjectedScripts?.length > 0 &&
                props.InjectedScripts.map((script, index) => (
                    <HtmlScript
                        key={`header_scripts_${index}`}
                        type={script.type}
                        src={script.src}
                        props={script.props}
                    />
                ))}
        </head>
    );
};

HtmlHead.displayName = 'HtmlHead';

export { HtmlHead, HeadProps };
