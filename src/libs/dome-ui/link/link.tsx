import { PageAlias } from '@libs/common/constants';
import { RouteBuilder } from '@libs/common/router';
import React, { FC } from 'react';

type LinkProperties = {
    key?: string;
    pageAlias?: PageAlias;
    href?: string;
};

const Link: FC<LinkProperties> = (props) => {
    const href = new RouteBuilder('');

    return <></>;
};

Link.displayName = 'Link';

export { Link };
