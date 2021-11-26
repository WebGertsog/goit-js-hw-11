import axios from "axios";

const BASE_URL = 'https://pixabay.com';
const KEY_API = '24514274-52e0231f5d7d433d8bfaeea6c';

async function axiosGet(searchQuery) {
  const options = {
    params:{
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: 1,
      per_page: 40,
    }
  };

    return await axios.get(`${BASE_URL}/api/?key=${KEY_API}`, options);
}

export {axiosGet};