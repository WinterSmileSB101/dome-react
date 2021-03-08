import { AllAppStateProvider } from '@libs/common';
import React, { ComponentType } from 'react';
import { hydrate } from 'react-dom';

// eslint-disable-next-line no-underscore-dangle
const initData = typeof window !== 'undefined' && (window as any)?.__initData__;

const clientBootstrap = (rootElement: ComponentType, rootSelector = '#app') => {
    const RootElement = rootElement;

    hydrate(
        <AllAppStateProvider values={{ initData }}>
            <RootElement />
        </AllAppStateProvider>,
        document.querySelector(rootSelector),
    );
};

export default { clientBootstrap };
