import axios, { AxiosInstance } from 'axios';
const instance: AxiosInstance = axios.create({ baseURL: 'https://api.openweathermap.org/data/2.5/weather' });
export const iconUrl = 'http://openweathermap.org/img/w/';
export default instance;
