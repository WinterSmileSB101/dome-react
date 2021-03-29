import React, { FC, useState } from 'react';
import { MenuItem, MenuItemProperties } from './menu-item';

if (process.env.BROWSER) {
    require('../static/styles/menu.scss');
}

type MenuProperties = {
    data: MenuItemProperties[];
};

const Menu: FC<MenuProperties> = (props) => {
    const [activeIndex, setActiveIndex] = useState(props?.data?.findIndex((d) => !!d.active) ?? 0);

    return (
        props.data?.length > 0 && (
            <ul className="elk__toolbar-menus content_fl">
                {props.data?.map((d, i) => {
                    const item = { ...d, active: activeIndex === i };
                    return <MenuItem key={`${d.name}_${i}`} {...item} onClick={() => setActiveIndex(i)} />;
                })}
            </ul>
        )
    );
};

Menu.displayName = 'Menu';

export { MenuProperties, Menu };
