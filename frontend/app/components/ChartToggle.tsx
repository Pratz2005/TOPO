'use client';

import React from 'react';

interface ChartToggleProps {
    showChart: boolean;
    setShowChart: (show: boolean) => void;
}

const ChartToggle: React.FC<ChartToggleProps> = ({ showChart, setShowChart }) => {
    return (
        <div className="flex items-center justify-end mb-4">
            <button
                onClick={() => setShowChart(!showChart)}
                className={`px-6 py-2 text-lg font-bold rounded-md shadow-md transition-all ${
                    showChart ? 'bg-gray-900 text-white' : 'bg-blue-500 text-white'
                }`}
            >
                {showChart ? 'Show Table' : 'Bar Chart'}
            </button>
        </div>
    );
};

export default ChartToggle;
