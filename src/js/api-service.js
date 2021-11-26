export default class ApiService {
  constructor() {}

  

    axiosGet(searchQuery, pageNum) {
    const BASE_URL = 'https://pixabay.com';
    const KEY_API = '24514274-52e0231f5d7d433d8bfaeea6c';
    const options = {
      params:{
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: pageNum,
        per_page: 5,
      }
    };

      return axios.get(`${BASE_URL}/api/?key=${KEY_API}`, options);
  }
}