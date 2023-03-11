import axios from 'axios';
const KEY_API = '32781851-5380a4cc45169f3ca42a551c9';
const BASE_URL = 'https://pixabay.com/api/';

export async function getPhoto(searchText, page) {
  const response =
    await axios.get(`${BASE_URL}?key=${KEY_API}&q=${searchText}&page=${page}&per_page=15
`);
  return response.data;
}
