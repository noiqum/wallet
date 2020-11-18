import * as React from 'react';
import { expenseType } from '../../store/context/userContext';
import { Pie } from 'react-chartjs-2';

const categoryPie: React.FC<{ expenseList: expenseType[] }> = ({ expenseList }) => {
    const canvasRef = React.useRef(null);
    const [category, setCategory] = React.useState({
        house: 0,
        utilies: 0,
        food: 0,
        transportation: 0,
        insurance: 0,
        household: 0,
        entertainment: 0,
        other: 0,
    });
    const [chartDataset, setChartDataset] = React.useState<any>();
    React.useEffect(() => {
        let data = {
            house: 0,
            utilies: 0,
            food: 0,
            transportation: 0,
            insurance: 0,
            household: 0,
            entertainment: 0,
            other: 0,
        };
        expenseList.forEach((expense) => {
            switch (expense.category) {
                case 'house':
                    return data.house++;

                case 'utilies':
                    return data.utilies++;
                case 'food':
                    return data.food++;
                case 'transportation':
                    return data.transportation++;
                case 'insurance':
                    return data.insurance;
                case 'household':
                    return data.household++;
                case 'entertainment':
                    return data.entertainment++;
                case 'other':
                    return data.other;
                default:
                    break;
            }
        });
        const counts = Object.values(data);
        const labels = Object.keys(data);
        const chartData = {
            datasets: [
                {
                    data: [...counts],
                    backgroundColor: [
                        '#845ec2',
                        '#76a9ff',
                        '#ff9671',
                        '#008f7a',
                        '#c34a36',
                        '#adc5cf',
                        '#faccff',
                        '#6575a8',
                    ],
                    width: '100%',
                },
            ],
            labels: [...labels],
        };
        setChartDataset(chartData);
        setCategory(data);
    }, [expenseList]);

    return (
        <div className="category">
            <Pie
                data={chartDataset}
                options={{
                    responsive: true,
                    rotation: 0,
                }}
            />
        </div>
    );
};

export default categoryPie;
