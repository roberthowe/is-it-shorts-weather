import { motion } from "framer-motion";

import CurrentWeatherCard from "@/components/CurrentWeatherCard";
import useCurrentLocation from "@/hooks/useCurrentLocation";

import { useLoadingContext } from "@/contexts/LoadingContext";

import shortsLogo from "@/assets/shorts.svg";
import "@/App.css";

function App() {
  const { isLoading } = useLoadingContext();
  const { location, locationError, getLocation } = useCurrentLocation();

  return (
    <>
      <a href="https://www.bobadevv.com" target="_blank">
        <img src={shortsLogo} className="logo" alt="Is It Shorts Weather?" />
      </a>
      <h1>Is It Shorts Weather?</h1>

      <div>
        {locationError && <p>Error: {locationError.message}</p>}
        {location && <CurrentWeatherCard location={location} />}
        {isLoading && !location && (
          <motion.div
            animate={{
              scale: [1, 1.1, 1, 1.1, 1],
            }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <p>Just getting your current location</p>
          </motion.div>
        )}
        {!isLoading && !location && !locationError && (
          <motion.div exit={{ opacity: 0 }} initial={{ opacity: 1 }}>
            <p>
              If prompted by your browser please allow access to your current
              location
            </p>
            <button onClick={getLocation}>Lets find out</button>
          </motion.div>
        )}
      </div>
    </>
  );
}

export default App;
