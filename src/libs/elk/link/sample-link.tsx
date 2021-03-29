import React, { FC } from 'react';

type SampleLinkProperties = {
    title: string;
    className?: string;
    href?: string; // use this will override inner link build logic
    target?: '_self' | '_top' | '_parent' | '_blank' | 'view_window' | 'view_frame';
};

const SampleLink: FC<SampleLinkProperties> = (props) => (
    <a title={props.title} target={props.target ?? '_blank'} href={props.href}>
        <>{props.children}</>
    </a>
);

SampleLink.displayName = 'SampleLink';

export { SampleLink };
