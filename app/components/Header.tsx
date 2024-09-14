import  Avatar from '@mui/material/Avatar';

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useThemeContext } from '../theme-context';
import Box from '@mui/material/Box'






const Header = () => {
    const { toggleTheme, themeMode } = useThemeContext();

  return (

    <>
    <Box>
      <Toolbar>
        <Avatar src="/avatar.png" alt="Avatar" sx={{ width: 50, height: 50, marginRight: 2 }} />
        <Typography variant="h6">Nutritionist</Typography>
        <IconButton color="inherit" onClick={toggleTheme}>
    {themeMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
  </IconButton>
      </Toolbar>
    </Box>
    
    </>
    
  );
};

export default Header;
