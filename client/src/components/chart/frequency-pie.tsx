import * as React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { expenseType } from '../../store/context/userContext';

const FrequencyPie: React.FC<{ expenseList: expenseType[] }> = ({ expenseList }) => {
    const [frequency, setFrequency] = React.useState({
        once: 0,
        weekly: 0,
        monthly: 0,
        yearly: 0,
    });
    const [chartDataset, setChartDataset] = React.useState<any>();
    React.useEffect(() => {
        let data = { ...frequency };
        expenseList.forEach((expense) => {
            switch (expense.frequency) {
                case 'once':
                    return data.once++;
                case 'weekly':
                    return data.weekly++;
                case 'monthly':
                    return data.monthly++;
                case 'yearly':
                    return data.yearly++;

                default:
                    return data;
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
                },
            ],
            labels: [...labels],
        };
        setChartDataset(chartData);
        setFrequency(data);
    }, [expenseList]);

    return (
        <div>
            <Doughnut
                data={chartDataset}
                options={{
                    responsive: true,
                    rotation: 0,
                    layout: {
                        padding: {
                            left: 0,
                        },
                    },
                    legend: {
                        align: 'start',
                        labels: {
                            boxWidth: 10,
                        },
                    },
                }}
                width={250}
            />
        </div>
    );
};

export default FrequencyPie;
