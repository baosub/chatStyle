'use client';
import { Roboto } from 'next/font/google';
import { createTheme, ThemeOptions , responsiveFontSizes} from '@mui/material/styles';


const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});


const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
};

const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
};

export { lightTheme, darkTheme };













const theme = 
    createTheme({
      typography: {
        fontFamily: roboto.style.fontFamily,
      },
    })






export default responsiveFontSizes(theme);