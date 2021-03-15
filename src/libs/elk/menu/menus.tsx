import React, { FC } from 'react';
import { MenuItem, MenuItemProperties } from './menu-item';

if (process.env.BROWSER) {
    require('../static/styles/menu.scss');
}

type MenuProperties = {
    data: MenuItemProperties[];
};

const Menu: FC<MenuProperties> = (props) =>
    props.data?.length > 0 && (
        <ul className="elk__toolbar-menus">
            {props.data?.map((d, i) => (
                <MenuItem key={`${d.name}_${i}`} {...d} />
            ))}
        </ul>
    );

Menu.displayName = 'Menu';

export { MenuProperties, Menu };
