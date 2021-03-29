import React, { FC } from 'react';
import Emoji from 'react-emoji-render';
import ServerSideRenderError from './ssr-error';

interface HtmlSSRErrorProps {
    isDev: boolean;

    error: ServerSideRenderError;
}

const HtmlSSRError: FC<HtmlSSRErrorProps> = (props) => {
    const errorStack = props?.error?.stack?.replaceAll('Error:', '');
    return (
        <html lang="zh" style={{ color: 'black', fontFamily: 'fangsong', fontSize: '26px' }}>
            <div>
                <Emoji text=":upside_down_face::upside_down_face::upside_down_face:SSR Error:upside_down_face::upside_down_face::upside_down_face:" />
                <div style={{ marginTop: '20px' }}>{errorStack}</div>
            </div>
        </html>
    );
};

HtmlSSRError.displayName = 'HtmlSSRError';

export { HtmlSSRError };
