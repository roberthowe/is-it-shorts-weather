import { SetStateAction, Dispatch } from "react";

export interface AppContextType {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export interface UserLocation {
  latitude: number | null;
  longitude: number | null;
}

export interface WeatherData {
  currentTemp: number | null;
}
