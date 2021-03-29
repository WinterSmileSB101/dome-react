import React, { FC } from 'react';
import { useHeaderData } from '@libs/common';
import { HeaderOption } from '@libs/server-side/types';

import { CommonHeader } from './common-header';

// eslint-disable-next-line @typescript-eslint/ban-types
type CommonTmpl = {};

const CommonTmpl: FC<CommonTmpl> = (props) => {
    const { children } = props;
    const headerData = useHeaderData<HeaderOption>();
    return (
        <>
            <CommonHeader
                logo={headerData.sloganLogo}
                menus={[
                    // {
                    //     name: 'Dome',
                    //     type: 'customize',
                    //     customizeFC: (
                    //         <img
                    //             src={headerData?.sloganLogo}
                    //             alt="Dome"
                    //             style={{ display: 'inline-block', backgroundColor: 'bisque', height: '100%' }}
                    //         />
                    //     ),
                    // },
                    { name: '工具', active: true },
                    {
                        name: 'zhge ',
                        type: 'customize',
                        customizeFC: <p>asdasdasdad</p>,
                    },
                ]}
            />
            <div>{children}</div>
        </>
    );
};

export { CommonTmpl };
