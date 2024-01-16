import React, { createContext, useContext, useState, ReactNode } from "react";

interface LoadingContextProps {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}

interface LoadingProviderProps {
  children: ReactNode;
}

const LoadingContext = createContext<LoadingContextProps | undefined>(
  undefined
);

export const useLoadingContext = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoadingContext must be used within a LoadingProvider");
  }
  return context;
};

export const LoadingProvider: React.FC<LoadingProviderProps> = ({
  children,
}: LoadingProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  return (
    <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
