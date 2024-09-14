'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Container, Box, TextareaAutosize, Button, TextField, InputAdornment } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useThemeContext } from './theme-context';
import SendIcon from '@mui/icons-material/Send';




interface Message {
  id: number;
  text: string;
}

const Chat: React.FC = () => {

  const { toggleTheme, themeMode } = useThemeContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  
  // Referencia para el área de mensajes
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Función para desplazar automáticamente al final de los mensajes
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Llamamos a scrollToBottom cada vez que cambia la lista de mensajes
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { id: Date.now(), text: inputValue }]);
      setInputValue('');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header fijo */}
      <Box sx={{ padding: '16px', textAlign: 'center', position: 'sticky', top: 0 }}>
      <IconButton color="inherit" onClick={toggleTheme}>
          {themeMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>

      {/* Área de mensajes con overflow */}
      <Box
        sx={{
          flex: 1,
          padding: '16px',
         
          overflowY: 'auto',
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
        {/* Div invisible para scroll automático */}
        <div ref={messagesEndRef} />
      </Box>

      {/* TextArea y botón de enviar fijos */}
      <Box
        sx={{
          display: 'flex',
          padding: '16px',
         
          borderTop: '1px solid #ddd',
          position: 'sticky',
          bottom: 0,
          width: '100%'
        }}
      >
        <TextField
        multiline
        fullWidth
        maxRows={4}
          
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
  );
};

export default Chat;
