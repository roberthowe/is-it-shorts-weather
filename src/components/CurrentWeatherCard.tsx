import React from "react";
import { motion } from "framer-motion";

import useWeatherData from "@/hooks/useWeatherData";
import { useLoadingContext } from "@/contexts/LoadingContext";

import { UserLocation } from "@/types";

interface CurrentWeatherCardProps {
  location: UserLocation;
}

const getTempOutcomeText = (currentTemp: number): string => {
  // Switch statement based on the value of 'day'
  switch (true) {
    case currentTemp >= 20:
      return "Yes! Grab your sunglasses while you are at it 😎";
      break;
    case currentTemp < 10:
      return "No! I would probably stay indoors and put on some extra layers 🥶";
      break;
    default:
      return "No, unless you are going on a run 🏃";
  }
};

const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({
  location,
}) => {
  const { isLoading } = useLoadingContext();
  const { weatherData } = useWeatherData(location);

  if (isLoading) return;

  if (!weatherData) {
    return <p>Current weather data cannot be found maybe it is too cold?</p>;
  }

  const { currentTemp } = weatherData;

  return (
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
      {currentTemp !== null ? (
        <React.Fragment>
          <h2>{getTempOutcomeText(currentTemp)}</h2>
          <p>The current temperature is {currentTemp}°C </p>
        </React.Fragment>
      ) : (
        <p>No temperature data available</p>
      )}
    </motion.div>
  );
};

export default CurrentWeatherCard;
