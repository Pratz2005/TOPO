'use client';

import React, { useState, useEffect } from 'react';
import { fetchUnifiedData, fetchFileSpecificData } from '../utils/api';

interface DataRow {
    [key: string]: string | number | null;
}

interface DataTableProps {
    fileType: string;
}

const DataTable: React.FC<DataTableProps> = ({ fileType }) => {
    const [data, setData] = useState<DataRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [sortField, setSortField] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    useEffect(() => {
        fetchData();
    }, [fileType, sortField, sortOrder]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const fileData =
                fileType === 'unified'
                    ? await fetchUnifiedData() // No sorting for unified
                    : await fetchFileSpecificData(fileType, sortField || undefined, sortOrder);
            setData(fileData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSort = (field: string) => {
        if (fileType === 'unified') return; // Disable sorting for unified
        const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortOrder(order);
    };

    return (
        <div>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-extrabold text-gray-800">{fileType.toUpperCase()} Data</h1>

                {/* Sorting Dropdown (Disabled for "unified") */}
                {fileType !== 'unified' && (
                    <div className="flex items-center gap-2">
                        <label className="text-gray-600">Sort by:</label>
                        <select
                            value={sortField || ''}
                            onChange={(e) => handleSort(e.target.value)}
                            className="p-2 border border-gray-400 rounded-lg text-gray-900 bg-white"
                        >
                            <option value="">None</option>
                            <option value="Date">Date</option>
                            <option value="Membership_ID">Membership ID</option>
                            <option value="Employee_ID">Employee ID</option>
                            <option value="Duration (Minutes)">Duration</option>
                            <option value="Revenue">Revenue</option>
                        </select>
                    </div>
                )}
            </div>

            {loading ? (
                <p className="text-lg text-gray-500">Loading...</p>
            ) : (
                <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
                    <table className="w-full border-collapse border border-gray-300 rounded-lg">
                        <thead>
                            <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white uppercase tracking-wider">
                                {data.length > 0 &&
                                    Object.keys(data[0]).map((key) => (
                                        <th
                                            key={key}
                                            className={`border border-gray-300 p-3 ${
                                                key === 'Date' ? 'min-w-[150px]' : ''
                                            } ${fileType === 'unified' ? '' : 'cursor-pointer'}`} // Disable pointer for unified
                                            onClick={() => handleSort(key)}
                                        >
                                            {key} {fileType !== 'unified' && sortField === key ? (sortOrder === 'asc' ? '🔼' : '🔽') : ''}
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

export default DataTable;
