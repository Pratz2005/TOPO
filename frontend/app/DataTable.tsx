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

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const fileData = fileType === 'unified' ? await fetchUnifiedData() : await fetchFileSpecificData(fileType);
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
        <div>
            <h1 className="text-3xl font-extrabold text-gray-800 mb-6">{fileType.toUpperCase()} Data</h1>

            {loading ? (
                <p className="text-lg text-gray-500">Loading...</p>
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

export default DataTable;
