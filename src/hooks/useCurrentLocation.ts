import { useCallback, useState } from "react";
import { UserLocation } from "@/types";
import { useLoadingContext } from "@/contexts/LoadingContext";

interface LocationError {
  message: string;
}

interface CurrentLocationHook {
  location: UserLocation | null;
  locationError: LocationError | null;
  getLocation: () => void;
}

const useCurrentLocation = (): CurrentLocationHook => {
  const { startLoading, stopLoading } = useLoadingContext();
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [locationError, setLocationError] = useState<LocationError | null>(
    null
  );

  const getLocation = useCallback(() => {
    startLoading();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          stopLoading();
          setLocationError({ message: error.message });
        }
      );
    } else {
      stopLoading();
      setLocationError({
        message: "Geolocation is not supported by your current browser.",
      });
    }
  }, []);

  return { location, locationError, getLocation };
};

export default useCurrentLocation;
