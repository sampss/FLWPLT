import React, { createContext, useState } from 'react';

export const ThemeContext = createContext({
  manualTheme: null,
  setManualTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [manualTheme, setManualTheme] = useState(null);

  return (
    <ThemeContext.Provider value={{ manualTheme, setManualTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
