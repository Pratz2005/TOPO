'use client';

import React, { useState } from 'react';
import FileDataPage from './FileDataPage';
import DataTable from './DataTable';

interface DataRow {
    [key: string]: string | number | null;
}

const Home = () => {
    const [selectedDataType, setSelectedDataType] = useState<string>('unified');
    const isFileDataPage = selectedDataType === 'pdf' || selectedDataType === 'pptx';

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 min-w-[16rem] bg-gradient-to-b from-blue-500 to-purple-500 text-white p-5 fixed h-screen shadow-lg">
                <h2 className="text-lg font-bold mb-4 tracking-wide">📊 Data Types</h2>
                <ul className="space-y-2">
                    {["unified", "csv", "json", "pdf", "pptx"].map((type) => (
                        <li
                            key={type}
                            onClick={() => setSelectedDataType(type)}
                            className={`cursor-pointer p-3 rounded-lg transition-all duration-300 hover:bg-white hover:text-gray-900 ${
                                selectedDataType === type ? "bg-white text-gray-900 font-bold shadow-md" : ""
                            }`}
                        >
                            {type.toUpperCase()} Data
                        </li>
                    ))}
                </ul>
            </div>

            {/* Main Content Area */}
            <div className="ml-64 flex-1 p-6 overflow-auto">
                {isFileDataPage ? (
                    <FileDataPage fileType={selectedDataType} />
                ) : (
                    <DataTable fileType={selectedDataType} />
                )}
            </div>
        </div>
    );
};

export default Home;

