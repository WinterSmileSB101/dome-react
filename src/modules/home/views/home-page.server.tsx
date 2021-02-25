import React, { Component } from 'react';
import { HomePage } from '../pages/home/home-page';

if (process.env.BROWSER) {
    require('../../../../static/styles/common.scss');
}
export class HomeView extends Component {
    render() {
        return <HomePage />;
    }
}
