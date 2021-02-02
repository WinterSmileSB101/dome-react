import React, { ComponentType } from 'react';
import { hydrate } from 'react-dom';

const clientBootstrap = (rootElement: ComponentType, rootSelector = '#app') => {
    const RootElement = rootElement;

    hydrate(<RootElement />, document.querySelector(rootSelector));
};

export default { clientBootstrap };
