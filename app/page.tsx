'use client'

import React, { useState, useRef, useEffect } from 'react';
import { createTheme, ThemeProvider, CssBaseline, Container, Box, TextField, IconButton, InputAdornment } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import { grey } from '@mui/material/colors';

interface Message {
  id: number;
  text: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          '*::-webkit-scrollbar': {
            width: '8px',
          },
          '*::-webkit-scrollbar-track': {
            backgroundColor: darkMode ? grey[900] : grey[300],
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: darkMode ? grey[700] : grey[500],
            borderRadius: '4px',
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: darkMode ? grey[600] : grey[700],
          },
        },
      },
    },
  });

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { id: Date.now(), text: inputValue }]);
      setInputValue('');
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box
          sx={{
            padding: '16px',
            backgroundColor: darkMode ? grey[900] : grey[100],
            textAlign: 'center',
            position: 'sticky',
            top: 0,
          }}
        >
          <h2>Header</h2>
          <button onClick={toggleDarkMode}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </Box>

        {/* Message area */}
        <Box
          sx={{
            flex: 1,
          
            padding: '16px',
            backgroundColor: darkMode ? '' : grey[200],
            maxWidth: 1,
            wordWrap: 'break-word',
            wordBreak: 'break-word',
            whiteSpace: 'pre-wrap',
           

            overflowY: 'scroll',
            '::-webkit-scrollbar': {
              display: 'none', // Ocultar en Chrome, Safari y Opera
            },
            scrollbarWidth: 'none', 
            minHeight: '0',
          }}
        >
          {messages.length === 0 ? (
            <p>No hay mensajes aún</p>
          ) : (
            messages.map((message) => (
              <p key={message.id}>{message.text}</p>
            ))
          )}
          <div ref={messagesEndRef} />
        </Box>

        {/* TextField con botón */}
        <Box
          sx={{
            padding: '16px',
            backgroundColor: darkMode ? grey[900] : grey[100],
            borderTop: `1px solid ${darkMode ? grey[700] : grey[300]}`,
            position: 'sticky',
            bottom: 0,
          }}
        >
          <TextField
            fullWidth
            multiline
            minRows={3}
            placeholder="Escribe tu mensaje aquí..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton color="primary" onClick={handleSend}>
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Chat;
