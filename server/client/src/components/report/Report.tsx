import * as React from 'react';
import './report.scss';

import { userContext } from '../../store/context/userContext';
import Header from '../header/header';
import CategoryPie from '../chart/category-pie';
import TotalBar from '../chart/total-bar';
import FrequencyPie from '../chart/frequency-pie';

function Report(): JSX.Element {
    const { state, dispatch } = React.useContext(userContext);

    return (
        <div className="report">
            <Header />
            <p>Reports</p>
            <TotalBar />
            <CategoryPie expenseList={state.expenses.expenses} />
            <FrequencyPie expenseList={state.expenses.expenses} />
        </div>
    );
}

export default Report;
