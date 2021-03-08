import React, { FC } from 'react';
import serialize from 'serialize-javascript';

export interface WindowScriptProps {
    propertyName: string;
    content: any;
}

export const WindowScript: FC<WindowScriptProps> = (props) => (
    <script
        defer
        type="text/javascript"
        dangerouslySetInnerHTML={{
            __html: `window.__${props.propertyName}__=${serialize(props.content, { isJSON: true })}`,
        }}
    />
);
