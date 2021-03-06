import { AllAppStateProvider } from '@libs/common';
import React, { ComponentType, FC } from 'react';
import { HeaderOption } from '../types';
import { WindowScriptProperties } from './detailTag/window-script';
import HtmlBody from './html-body';
import { HeadProps, HtmlHead } from './html-header';

interface HtmlStructureProps {
    bodyElement: ComponentType;
    headOption: HeadProps;

    headerData?: HeaderOption;
    initData: any;

    windowScripts?: WindowScriptProperties[];
}

const HtmlStructure: FC<HtmlStructureProps> = (props) => {
    const BodyEl = props.bodyElement;

    return (
        <AllAppStateProvider values={{ initData: props.initData, headerData: props.headerData }}>
            <html lang="zh">
                <HtmlHead {...props.headOption} />
                <HtmlBody.HtmlBody
                    initData={props?.initData}
                    headerData={props.headerData}
                    windowScripts={props.windowScripts}
                >
                    <BodyEl data-content />
                </HtmlBody.HtmlBody>
            </html>
        </AllAppStateProvider>
    );
};

HtmlStructure.displayName = 'HtmlStructure';

export default { HtmlStructure };
