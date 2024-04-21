import axios from 'axios';
import config from '../config';
import {API_LIMIT} from '../constants';

async function fetchTrendingGifs(offset: number) {
  try {
    const response = await axios.get(
      `${config.BASE_URL}trending?api_key=${config.API_KEY}&limit=${API_LIMIT}&offset=${offset}`,
    );
    return response;
  } catch (error) {
    throw error;
  }
}

async function getTrendingGifsBySearch(query: string) {
  try {
    const response = await axios.get(
      `${config.BASE_URL}search?api_key=${config.API_KEY}&limit=${API_LIMIT}&q=${query}`,
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export {getTrendingGifsBySearch, fetchTrendingGifs};
