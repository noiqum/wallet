import * as React from 'react';
import Avatar from '../svg/avatar.svg';
import Dashboard from '../svg/dashboard.svg';
import Bill from '../svg/bill.svg';
import Report from '../svg/report.svg';
import Setting from '../svg/setting.svg';
import { useHistory } from 'react-router-dom';
type TypeProps = {
    username?: string;
};

const Side: React.FC<TypeProps> = ({ username }) => {
    const history = useHistory();
    const redirect = (path: string) => {
        history.push(`${path}`);
    };
    return (
        <div className="side">
            <div className="side__img">
                <img src={Avatar} alt="avatar" />
                <p>Welcome back</p>
                <p>
                    <span>{username}</span>
                </p>
            </div>
            <div className="side__links">
                <div>
                    <img src={Dashboard} alt="dashboard" /> Dashboard
                </div>
                <div
                    onClick={() => {
                        redirect('/bill');
                    }}
                >
                    <img src={Bill} alt="bill" />
                    Bills
                </div>
                <div onClick={() => redirect('/report')}>
                    <img src={Report} alt="report" />
                    Reports
                </div>
                <div onClick={() => redirect('setting')}>
                    <img src={Setting} alt="setting" />
                    Settings
                </div>
            </div>
        </div>
    );
};

export default Side;
