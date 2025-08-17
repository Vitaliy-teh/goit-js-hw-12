import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '51715494-fc6bd8fe76f0a6511ef4fb43b';
const PER_PAGE = 15;

export async function getImagesByQuery(query, page = 1) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: PER_PAGE,
        page: page,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}
