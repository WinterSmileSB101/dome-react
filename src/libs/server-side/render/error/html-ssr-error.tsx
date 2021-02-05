import React, { FC } from 'react';

interface HtmlSSRErrorProps {
    isDev: boolean;

    error: Error;
}

const HtmlSSRError: FC<HtmlSSRErrorProps> = (props) => <>{props.error}</>;

HtmlSSRError.displayName = 'HtmlSSRError';

export { HtmlSSRError };
