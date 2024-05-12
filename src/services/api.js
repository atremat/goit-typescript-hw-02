import axios from "axios";

const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY;

axios.defaults.baseURL = "https://api.unsplash.com";

const fetchImages = async (query, page) => {
  const headers = {
    Authorization: `Client-ID ${ACCESS_KEY}`,
  };

  const requestUrl = `/search/photos?page=${page}&per_page=21&query=${query}`;

  const response = await axios.get(requestUrl, { headers });
  return response.data;
};

export default fetchImages;
