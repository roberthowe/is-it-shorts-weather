import { useState, useEffect } from "react";
import { UserLocation, WeatherData } from "@/types";
import { useLoadingContext } from "@/contexts/LoadingContext";

interface WeatherDataHook {
  weatherData: WeatherData | null;
}

const useWeatherData = (location: UserLocation): WeatherDataHook => {
  const { stopLoading } = useLoadingContext();
  const [weatherData, setWeatherData] = useState<WeatherData>({
    currentTemp: null,
  });

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const { latitude, longitude } = location;

        if (!latitude || !longitude) {
          stopLoading();
          return;
        }

        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`
        );

        if (!response.ok) {
          console.error("Failed to fetch weather data from open meteo");
        }

        const data = await response.json();
        setWeatherData({ currentTemp: data.current.temperature_2m });
        stopLoading();
      } catch (error) {
        console.error((error as Error).message);
        stopLoading();
      }
    };

    fetchWeatherData();
  }, [location]);

  return { weatherData };
};

export default useWeatherData;
