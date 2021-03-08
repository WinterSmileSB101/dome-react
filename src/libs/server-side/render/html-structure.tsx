import { AllAppStateProvider } from '@libs/common';
import React, { ComponentType, FC } from 'react';
import HtmlBody from './html-body';
import { HeadProps, HtmlHead } from './html-header';

interface HtmlStructureProps {
    bodyElement: ComponentType;
    headOption: HeadProps;
    initData: any;
}

const HtmlStructure: FC<HtmlStructureProps> = (props) => {
    const BodyEl = props.bodyElement;

    return (
        <AllAppStateProvider values={{ initData: props.initData }}>
            <html lang="zh">
                <HtmlHead
                    seo={props.headOption?.seo}
                    metaList={props.headOption?.metaList}
                    injectedScripts={props.headOption?.injectedScripts}
                    injectedStyles={props.headOption?.injectedStyles}
                />
                <HtmlBody.HtmlBody initData={props?.initData}>
                    <BodyEl data-content />
                </HtmlBody.HtmlBody>
            </html>
        </AllAppStateProvider>
    );
};

HtmlStructure.displayName = 'HtmlStructure';

export default { HtmlStructure };
