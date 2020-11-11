import * as React from 'react';
import { userContext } from '../../store/context/userContext';
import List from '../list/list';
import Header from '../header/header';

const Expense: React.FC = () => {
    const { state } = React.useContext(userContext);
    return (
        <div className="expenses">
            <Header />
            <List expenses={state.expenses.expenses} />
        </div>
    );
};

export default Expense;
