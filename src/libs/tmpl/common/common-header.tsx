import React, { FC } from 'react';
import { Menu, MenuItemProperties } from '@libs/elk';

if (process.env.BROWSER) {
    require('../static/styles/common_header.scss');
}
// eslint-disable-next-line @typescript-eslint/ban-types
type CommonHeaderProps = {
    logo: string;
    menus: MenuItemProperties[];
};

const CommonHeader: FC<CommonHeaderProps> = (props) => {
    const test = '';
    return (
        <div className="common_header">
            <div className="header_container">
                <div className="header_content_left">
                    {props?.logo?.length > 0 && (
                        <div className="header_logo content_fl">
                            <img src={props.logo} alt="Home" />
                        </div>
                    )}
                    <Menu data={props.menus} />
                </div>
                <div className="header_content_middle">middle</div>
                <div className="header_content_right">right</div>
            </div>
        </div>
    );
};

export { CommonHeader };
