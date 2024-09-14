'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, responsiveFontSizes } from '@mui/material';
import { lightTheme, darkTheme } from './theme';


interface ThemeContextType {
  toggleTheme: () => void;
  themeMode: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);


export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext debe ser usado dentro de ThemeProvider');
  }
  return context;
};

export const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('themeMode') as 'light' | 'dark';
    if (savedTheme) {
      setThemeMode(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    setThemeMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', newMode);
      return newMode;
    });
  };

  //const theme = createTheme(themeMode === 'light' ? lightTheme : darkTheme);
  const baseTheme = themeMode === 'light' ? lightTheme : darkTheme;
  const theme = responsiveFontSizes(createTheme(baseTheme));

  return (
    <ThemeContext.Provider value={{ toggleTheme, themeMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
