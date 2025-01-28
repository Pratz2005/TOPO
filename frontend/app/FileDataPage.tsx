'use client';

import React, { useState, useEffect } from 'react';
import { fetchFileSpecificData } from '../utils/api';
import BarChart from './charts/BarChart';
import ChartToggle from './components/ChartToggle';

interface DataRow {
    [key: string]: string | number | null;
}

interface FileDataPageProps {
    fileType: string;
}

const FileDataPage: React.FC<FileDataPageProps> = ({ fileType }) => {
    const [data, setData] = useState<DataRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [showChart, setShowChart] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const fileData = await fetchFileSpecificData(fileType);
                setData(fileData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [fileType]);

    return (
        <div className={`p-6 ${showChart ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-extrabold">{fileType.toUpperCase()} Data</h1>
                <ChartToggle showChart={showChart} setShowChart={setShowChart} />
            </div>

            {loading ? (
                <p className="text-lg">Loading...</p>
            ) : showChart ? (
                <BarChart data={data} />
            ) : (
                <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
                    <table className="w-full border-collapse border border-gray-300 rounded-lg">
                        <thead>
                            <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white uppercase tracking-wider">
                                {data.length > 0 &&
                                    Object.keys(data[0]).map((key) => (
                                        <th key={key} className={`border border-gray-300 p-3 ${key === 'Date' ? 'min-w-[150px]' : ''}`}>
                                            {key}
                                        </th>
                                    ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, index) => (
                                <tr key={index} className="hover:bg-gray-200 transition-all duration-200">
                                    {Object.values(row).map((value, i) => (
                                        <td key={i} className="border border-gray-300 p-3 text-center">
                                            {value}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default FileDataPage;
