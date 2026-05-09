import { createContext, useContext, useState } from 'react';

const SnackbarContext = createContext();

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within SnackbarProvider');
  }
  return context;
};

export const SnackbarProvider = ({ children }) => {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  return (
    <SnackbarContext.Provider value={{ isSnackbarOpen, setIsSnackbarOpen }}>
      {children}
    </SnackbarContext.Provider>
  );
};
