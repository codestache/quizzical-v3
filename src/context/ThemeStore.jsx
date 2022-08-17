import React, { useState, createContext } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, GlobalStyles } from '../Theme';

const ThemeContext = createContext();

const ThemeStore = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };
  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <ThemeContext.Provider value={{ toggleTheme, theme }}>
        {children}
      </ThemeContext.Provider>
    </ThemeProvider>
  );
};

export { ThemeContext, ThemeStore };
