import * as React from 'react';
import { Bar } from 'react-chartjs-2';
import { userContext } from '../../store/context/userContext';
import { chartdata, getTotalMonth } from '../report/report.utils';

const TotalBar: React.FC = () => {
    const { state } = React.useContext(userContext);
    const [chartData, setChartData] = React.useState<any>(null);

    React.useEffect(() => {
        setChartData(getTotalMonth(state.expenses.expenses));
    }, [state.expenses.expenses]);
    return <div className="totalbar">{chartdata && <Bar width={250} data={chartdata} />}</div>;
};

export default TotalBar;
