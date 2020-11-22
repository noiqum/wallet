import * as React from 'react';
import './report.scss';

import { userContext } from '../../store/context/userContext';
import Header from '../header/header';
import { Bar } from 'react-chartjs-2';
import TotalBar from '../chart/total-bar';
import { chartdata, getTotalMonth } from './report.utils';

function Report(): JSX.Element {
    const { state, dispatch } = React.useContext(userContext);

    return (
        <div className="report">
            <Header />
            <p>report</p>
            <TotalBar />
        </div>
    );
}

export default Report;
