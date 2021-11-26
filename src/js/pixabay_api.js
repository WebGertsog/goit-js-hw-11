import axios from "axios";

const BASE_URL = 'https://pixabay.com';
const KEY_API = '24514274-52e0231f5d7d433d8bfaeea6c';

async function axiosGet(searchQuery, pageNum, perPage) {
  const options = {
    params:{
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: pageNum,
      per_page: perPage,
    }
  };

    return await axios.get(`${BASE_URL}/api/?key=${KEY_API}`, options);
}

export {axiosGet};