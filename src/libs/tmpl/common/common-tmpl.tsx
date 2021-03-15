import React, { FC } from 'react';
import { CommonHeader } from './common-header';

// eslint-disable-next-line @typescript-eslint/ban-types
type CommonTmpl = {};

const CommonTmpl: FC<CommonTmpl> = (props) => {
    const { children } = props;
    return (
        <>
            <CommonHeader
                menus={[
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
