import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

// Fetch Unified Data with Sorting
export const fetchUnifiedData = async (sortBy: string = '', sortOrder: string = 'asc') => {
    const response = await axios.get(`${API_BASE_URL}/data`, {
        params: sortBy ? { sort_by: sortBy, order: sortOrder } : {},
    });
    return response.data;
};

// Fetch File-Specific Data with Sorting
export const fetchFileSpecificData = async (fileType: string, sortBy: string = '', sortOrder: string = 'asc') => {
    const response = await axios.get(`${API_BASE_URL}/data/${fileType}`, {
        params: sortBy ? { sort_by: sortBy, order: sortOrder } : {},
    });
    return response.data;
};
