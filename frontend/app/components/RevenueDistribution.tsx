'use client';

import React, { useState, useEffect } from 'react';
import { fetchRevenueBreakdown } from '../../utils/api';
import PieChart from '../charts/PieChart';

const RevenueDistribution = () => {
    const [revenueData, setRevenueData] = useState<{ [key: string]: number }>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchRevenueBreakdown();
                setRevenueData(data);
            } catch (error) {
                console.error('Error fetching revenue breakdown:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="p-6">
            {loading ? <p className="text-white">Loading revenue distribution...</p> : <PieChart revenueData={revenueData} />}
        </div>
    );
};

export default RevenueDistribution;
