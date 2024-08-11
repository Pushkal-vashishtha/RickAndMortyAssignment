import axios from 'axios';

const BASE_URL = 'https://rickandmortyapi.com/api';

export const getCharacters = async (page = 1, filter = {}) => {
  try {
    console.log('Fetching characters with filters:', { page, ...filter });

    const params = { page, ...filter };

    // Make the API call
    const response = await axios.get(`${BASE_URL}/character`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching characters:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getCharacter = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/character/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching character:', error.response ? error.response.data : error.message);
    throw error;
  }
};
