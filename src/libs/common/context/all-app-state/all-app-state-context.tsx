import React, { createContext, FC } from 'react';
import { AllAppState } from './types';

export const AllAppStateContext = createContext<AllAppState>({ initData: {} });

export const AllAppStateProvider: FC<{ values: AllAppState }> = (props) => (
    <AllAppStateContext.Provider value={props.values}>
        <>{props.children}</>
    </AllAppStateContext.Provider>
);
