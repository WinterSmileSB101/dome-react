import { useEffect, useRef } from 'react';

const useFxNow = () => {
    const fxNowReference = useRef<number>(Date.now());

    const createFxNow = () => {
        window.setTimeout(() => {
            fxNowReference.current = undefined;
        });

        fxNowReference.current = Date.now();
        return fxNowReference.current;
    };

    useEffect(() => {
        fxNowReference.current = fxNowReference.current || createFxNow();
    }, []);

    return {
        fxNow: fxNowReference.current || createFxNow(),
    };
};

export default { useFxNow };
