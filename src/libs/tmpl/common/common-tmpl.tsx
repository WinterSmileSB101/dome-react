import React, { FC } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
type CommonTmpl = {};

const CommonTmpl: FC<CommonTmpl> = (props) => {
    const { children } = props;
    return (
        <>
            <h1>asdads</h1>
            <div>{children}</div>
        </>
    );
};

export { CommonTmpl };
