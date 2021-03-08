import { CommonTmpl, Template } from '@libs/tmpl';
import React, { Component } from 'react';
import { MachineInfoPage } from '../pages/machine-info/machine-info-page';

if (process.env.BROWSER) {
    // eslint-disable-next-line import/no-unresolved
    require('../../../../static/styles/common.scss');
}

// eslint-disable-next-line react/prefer-stateless-function
@Template(CommonTmpl)
export class MachineInfoView extends Component {
    render() {
        return <MachineInfoPage />;
    }
}
