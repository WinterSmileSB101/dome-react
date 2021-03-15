import React, { FC } from 'react';
import serialize from 'serialize-javascript';

export interface WindowScriptProperties {
    propertyName: string;
    content: string;
}

export const WindowScript: FC<WindowScriptProperties> = (props) => (
    <script
        defer
        type="text/javascript"
        dangerouslySetInnerHTML={{
            __html: `window.__${props.propertyName}__=${serialize(props.content, { isJSON: true })}`,
        }}
    />
);
