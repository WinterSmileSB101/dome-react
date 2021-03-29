import React, { useContext } from 'react';

import { AllAppStateContext } from '@libs/common/context';
// import { AllAppStateContext } from '@libs/common';

export const useHeaderData = <T,>(): T => useContext(AllAppStateContext)?.headerData;
