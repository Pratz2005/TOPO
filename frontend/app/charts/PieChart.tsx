'use client';

import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
    revenueData: { [key: string]: number }; // Example: { Gym: 40, Pool: 25, Tennis Court: 15, Personal Training: 20 }
}

const PieChart: React.FC<PieChartProps> = ({ revenueData }) => {
    const labels = Object.keys(revenueData);
    const dataValues = Object.values(revenueData);

    const chartData = {
        labels: labels,
        datasets: [
            {
                data: dataValues,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50'], // Colors for each section
                hoverBackgroundColor: ['#FF4C70', '#2E9FED', '#FFC845', '#3DAA44'],
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: {
                    color: 'white', // Make legend text white
                },
            },
        },
    };

    return (
        <div className="bg-black p-6 rounded-lg shadow-lg">
            <h2 className="text-white text-xl font-bold text-center mb-4">Revenue Breakdown</h2>
            <Pie data={chartData} options={options} />
        </div>
    );
};

export default PieChart;
