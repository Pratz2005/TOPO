'use client';

import React, { useState, useEffect } from 'react';
import { fetchUnifiedData } from '../utils/api';

interface DataRow {
    [key: string]: string | number | null;
}

const Home = () => {
    const [data, setData] = useState<DataRow[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const unifiedData = await fetchUnifiedData();
                setData(unifiedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <main>
            <h1>Unified Dataset</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table border={1} style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            {data.length > 0 &&
                                Object.keys(data[0]).map((key) => <th key={key}>{key}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr key={index}>
                                {Object.values(row).map((value, i) => (
                                    <td key={i}>{value}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </main>
    );
};

export default Home;
