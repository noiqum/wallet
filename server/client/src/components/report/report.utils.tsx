import { expenseType } from '../../store/context/userContext';

export let chartdata = {
    labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
    datasets: [
        {
            label: '',
            data: [15, 20, 5, 11, 30, 4, 55, 10, 5, 22, 11, 33],
            backgroundColor: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(153, 102, 255, 0.8)',
                'rgba(255, 159, 64, 0.8)',
                'rgba(26, 35, 126,0.8)',
                'rgba(216, 27, 96,0.8)',
                'rgba(96, 125, 139, 0.8)',
                'rgba(158, 157, 36, 0.8)',
                'rgba(255, 235, 59, 0.8)',
                'rgba(156, 39, 176, 0.8)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(26, 35, 126, 1)',
                'rgba(216, 27, 96, 1)',
                'rgba(96, 125, 139, 1)',
                'rgba(158, 157, 36, 1)',
                'rgba(255, 238, 88, 1)',
                'rgba(156, 39, 176, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

export const getTotalMonth = (expenses: expenseType[]) => {
    const newChartData = { ...chartdata };
    const months = [];
    for (let i = 1; i <= 12; i++) {
        if (i < 10) {
            months.push('0' + i);
        } else {
            months.push(i.toString());
        }
    }
    newChartData.labels = [...months];
    const amounts = {
        add: function (month: string, amount: number) {
            return (this[month] = amount);
        },
        sum: function (month: string, amount: number) {
            return (this[month] += amount);
        },
        get: function (month: string) {
            return this[month];
        },
    };
    months.forEach((month) => {
        amounts.add(month, 0);
    });

    expenses.forEach((expense) => {
        const month = expense.date.substr(5, 2);
        amounts.sum(month, expense.price);
    });
    newChartData.datasets[0].label = 'total exp by month';
    const values: number[] = [];
    months.forEach((e) => {
        values.push(amounts.get(e));
    });
    newChartData.datasets[0].data = [...values];
    return newChartData;
};
