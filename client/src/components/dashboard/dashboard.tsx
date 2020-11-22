import * as React from 'react';
import Arrow from '../svg/arrow.svg';
import Upload from '../svg/upload.svg';
import { useHistory } from 'react-router-dom';
import List from '../list/list';
import { userContext } from '../../store/context/userContext';
import CategoryPie from '../chart/category-pie';
import TotalBar from '../chart/total-bar';

const Dashboard: React.FC = () => {
    const history = useHistory();

    const { state } = React.useContext(userContext);
    return (
        <div className="dashboard">
            <List expenses={state.expenses.expenses} />
            <div className="dashboard__blocks">
                <div>
                    <div className="dashboard__blocks__header">
                        <span>Expenses</span>
                        <img src={Arrow} alt="arrow_icon" onClick={() => history.push('/expenses')} />
                    </div>
                    <CategoryPie expenseList={state.expenses.expenses} />
                </div>
                <div>
                    <div className="dashboard__blocks__header">
                        <span>Bills</span>
                        <img src={Arrow} alt="arrow_icon" onClick={() => history.push('/bills')} />
                    </div>
                    <div className="dashboard__blocks__main">
                        <div className="dashboard__blocks__main-add">
                            <img src={Upload} alt="upload_icon" />
                            <span>Upload Bill</span>
                        </div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                <div>
                    <div className="dashboard__blocks__header">
                        <span>Reports</span>
                        <img
                            onClick={() => {
                                history.push('/report');
                            }}
                            src={Arrow}
                            alt="arrow_icon"
                        />
                    </div>
                    <TotalBar />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
