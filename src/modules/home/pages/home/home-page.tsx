import React, { FC } from 'react';
// import { useScrollTop } from '../../hooks/useScrollTop/useScrollTop';

const HomePage: FC = (props) => {
    const test = 1;
    return (
        <>
            <h1>111111111111</h1>
            <p>asdasdasd</p>
            <button
                onClick={() => {
                    console.log('点上了，鸡冻不');
                }}
            >
                点我
            </button>
        </>
    );
};

HomePage.displayName = 'HomePage';

export { HomePage };
