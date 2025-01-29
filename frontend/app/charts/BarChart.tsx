'use client';

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarChartProps {
    data: any[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
    const chartData = {
        labels: data.map((row) => row.Quarter || 'N/A'),
        datasets: [
            {
                label: 'Memberships Sold',
                data: data.map((row) => row["Memberships Sold"] || 0),
                backgroundColor: 'rgba(255, 99, 132, 0.7)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
            {
                label: 'Avg Duration (Minutes)',
                data: data.map((row) => row["Avg Duration (Minutes)"] || 0),
                backgroundColor: 'rgba(75, 192, 192, 0.7)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Quarterly Data Overview',
            },
        },
    };

    return <Bar data={chartData} options={options} />;
};

export default BarChart;
