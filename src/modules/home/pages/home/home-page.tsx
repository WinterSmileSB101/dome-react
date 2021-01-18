import React, { FC } from 'react';
// import { useScrollTop } from '../../hooks/useScrollTop/useScrollTop';

const HomePage: FC = (props) => {
    const test = 1;
    return (
        <>
            <p>asdasdasd</p>
            <textarea
                style={{
                    height: 300,
                }}
                id="test"
                value="asdasd"
            />
        </>
    );
};

HomePage.displayName = 'HomePage';

export { HomePage };
