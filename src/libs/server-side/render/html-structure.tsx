import React, { ComponentType, FC } from 'react';
import HtmlBody from './html-body';
import { HeadProps, HtmlHead } from './html-header';

interface HtmlStructureProps {
    bodyElement: ComponentType;
    headOption: HeadProps;
}

const HtmlStructure: FC<HtmlStructureProps> = (props) => {
    const BodyEl = props.bodyElement;

    return (
        <>
            <html lang="zh">
                <HtmlHead
                    seo={props.headOption?.seo}
                    metaList={props.headOption?.metaList}
                    injectedScripts={props.headOption?.injectedScripts}
                    injectedStyles={props.headOption?.injectedStyles}
                />
                <HtmlBody.HtmlBody>
                    <BodyEl />
                </HtmlBody.HtmlBody>
            </html>
        </>
    );
};

HtmlStructure.displayName = 'HtmlStructure';

export default { HtmlStructure };
