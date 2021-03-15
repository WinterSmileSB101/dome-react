import React, { FC } from 'react';
import cn from 'classnames';

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
        <li className={cn({ active: !!props.active })} data-name={props.name}>
            {/* type is text */}
            {type === 'text' && props.name?.trim()}
            {/* type is customize */}
            {type === 'customize' && props.customizeFC}
        </li>
    );
};

MenuItem.displayName = 'MenuItem';

export { MenuItemProperties, MenuItem };
