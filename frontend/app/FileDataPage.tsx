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
    const [sortField, setSortField] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    useEffect(() => {
        fetchData();
    }, [fileType, sortField, sortOrder]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const fileData = await fetchFileSpecificData(fileType, sortField || undefined, sortOrder);
            setData(fileData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSort = (field: string) => {
        const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortOrder(order);
    };

    return (
        <div className={`p-6 ${showChart ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-extrabold">{fileType.toUpperCase()} Data</h1>

                {/* Sorting Dropdown (Only for PDF & PPTX) */}
                {(fileType === 'pdf' || fileType === 'pptx') && (
                    <div className="flex items-center gap-2">
                        <label className="text-gray-600">Sort by:</label>
                        <select
                            value={sortField || ''}
                            onChange={(e) => handleSort(e.target.value)}
                            className="p-2 border border-gray-400 rounded-lg text-gray-900 bg-white"
                        >
                            <option value="">None</option>
                            <option value="Year">Year</option>
                            <option value="Quarter">Quarter</option>
                            <option value="Revenue (in $)">Revenue</option>
                            <option value="Memberships Sold">Memberships Sold</option>
                            <option value="Avg Duration (Minutes)">Avg Duration</option>
                        </select>
                    </div>
                )}

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
                                        <th
                                            key={key}
                                            className={`border border-gray-300 p-3 cursor-pointer ${
                                                key === 'Date' ? 'min-w-[150px]' : ''
                                            }`}
                                            onClick={() => handleSort(key)}
                                        >
                                            {key} {sortField === key ? (sortOrder === 'asc' ? '🔼' : '🔽') : ''}
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
