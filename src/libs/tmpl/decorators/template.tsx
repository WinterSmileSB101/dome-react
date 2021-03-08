import React from 'react';

const Template: any = (Wrapper) => (component: any) => {
    class WrapperComponent extends component {
        render() {
            return <Wrapper>{React.createElement(component, this.props)}</Wrapper>;
        }
    }
    return WrapperComponent;
};

export { Template };
