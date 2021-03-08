import React, { useContext } from 'react';

import { AllAppStateContext } from '@libs/common/context';
// import { AllAppStateContext } from '@libs/common';

export const useInitData = <T,>(): T => useContext(AllAppStateContext)?.initData;
