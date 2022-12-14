export interface Coordinates {
  long: number;
  lat: number;
}

export interface WeatherDescription {
  main: string;
  description: string;
  icon: string;
}

export interface WeatherMain {
  temp: number;
  feels_like: string;
  temp_max: number;
  temp_min: number;
  presure: number;
  humidity: number;
}

export interface WeatherWind {
  speed: number;
  deg: number;
}

export interface MarkLocation {
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface WeatherResponse {
  coords: Coordinates;
  description: WeatherDescription;
  main: WeatherMain;
  wind: WeatherWind;
  location?: MarkLocation;
  id: number;
  name: string;
  timezone: number;
  visibility: number;
}

export interface Error {
  code: number;
  message: string;
}
export interface Country {
  id: number;
  name: string;
  iso2: string;
}
export interface City {
  id: number;
  name: string;
}
