/* eslint-disable no-underscore-dangle */
import { AllAppStateProvider } from '@libs/common';
import React, { ComponentType } from 'react';
import { hydrate } from 'react-dom';

const isWindowHere = typeof window !== 'undefined';
const initData = isWindowHere && (window as any)?.__initData__;
const headerData = isWindowHere && (window as any)?.__headerData__;

const clientBootstrap = (rootElement: ComponentType, rootSelector = '#app') => {
    const RootElement = rootElement;

    hydrate(
        <AllAppStateProvider values={{ initData, headerData }}>
            <RootElement />
        </AllAppStateProvider>,
        document.querySelector(rootSelector),
    );
};

export default { clientBootstrap };
