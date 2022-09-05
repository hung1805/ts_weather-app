import axios, { AxiosInstance } from 'axios';
const weatherInstance: AxiosInstance = axios.create({ baseURL: 'https://api.openweathermap.org/data/2.5/weather' });

const countryInstance: AxiosInstance = axios.create({ baseURL: 'https://api.countrystatecity.in/v1/' });
export const iconUrl = 'http://openweathermap.org/img/w/';
export { weatherInstance, countryInstance };
