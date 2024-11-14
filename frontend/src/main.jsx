import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles'; 
import App from './App';
import theme from './theme/theme';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter
     future={{ 
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }}
    >
      <ThemeProvider theme={theme}>
        <AuthContextProvider>
        <App />
        </AuthContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

