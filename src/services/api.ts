import axios, { AxiosResponse } from "axios";

const ACCESS_KEY: string = import.meta.env.VITE_ACCESS_KEY;

axios.defaults.baseURL = "https://api.unsplash.com";

const fetchImages = async <T>(query: string, page: number): Promise<T> => {
  const headers = {
    Authorization: `Client-ID ${ACCESS_KEY}`,
  };

  const requestUrl: string = `/search/photos?page=${page}&per_page=21&query=${query}`;

  const response: AxiosResponse<T> = await axios.get(requestUrl, { headers });

  return response.data;
};

export default fetchImages;
