import { useInitData } from '@libs/common';
import { RouteBuilder } from '@libs/common/router';
import React, { FC, useEffect } from 'react';
// import { useScrollTop } from '../../hooks/useScrollTop/useScrollTop';

const MachineInfoPage: FC = (props) => {
    const initData = useInitData() as any;
    // console.log(initData);
    return (
        <>
            <h1>asdasdasd</h1>
            <button
                type="button"
                onClick={() => {
                    console.log('点上了，鸡冻不');
                }}
            >
                {new RouteBuilder('hostsss')
                    .setProtocol('http')
                    .setPath('/a/:b/c/:t')
                    .build({ a: 1, b: 'b2', c: true })}
            </button>
        </>
    );
};

MachineInfoPage.displayName = 'MachineInfoPage';

export { MachineInfoPage };
