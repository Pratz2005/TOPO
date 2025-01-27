import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const fetchUnifiedData = async () => {
    const response = await axios.get(`${API_BASE_URL}/data`);
    return response.data;
};

export const fetchFileSpecificData = async (fileType: string) => {
    const response = await axios.get(`${API_BASE_URL}/data/${fileType}`);
    return response.data;
};
