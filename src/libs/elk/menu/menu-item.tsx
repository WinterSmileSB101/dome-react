/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FC } from 'react';
import cn from 'classnames';
import { isFunction } from 'lodash';
// import { SampleLink } from '../link/Sample-Link';
// import { Link } from '@libs/dome-ui/link/link';

type MenuItemProperties = {
    name: string;

    active?: boolean;
    type?: 'text' | 'link' | 'img' | 'customize';
    customizeFC?: JSX.Element; // we'll use this when type is customize
    onClick?: () => void;
};

const MenuItem: FC<MenuItemProperties> = (props) => {
    const { type = 'text' } = props;
    return (
        <li
            className={cn({ active: !!props.active })}
            data-name={props.name}
            onClick={() => {
                if (isFunction(props.onClick)) {
                    props.onClick();
                }
            }}
        >
            {/* type is text */}
            {/* {type === 'text' && <Link props.name?.trim()/>} */}
            {/* type is customize */}
            {type === 'customize' && props.customizeFC}
        </li>
    );
};

MenuItem.displayName = 'MenuItem';

export { MenuItemProperties, MenuItem };
