import { useInitData } from '@libs/common';
import React, { FC, useEffect } from 'react';
// import { useScrollTop } from '../../hooks/useScrollTop/useScrollTop';

const MachineInfoPage: FC = (props) => {
    const initData = useInitData() as any;
    console.log(initData);
    return (
        <>
            <h1>asdasdasd</h1>
            <button
                type="button"
                onClick={() => {
                    console.log('点上了，鸡冻不');
                }}
            >
                点我
            </button>
        </>
    );
};

MachineInfoPage.displayName = 'MachineInfoPage';

export { MachineInfoPage };
