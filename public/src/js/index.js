import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { blueGrey, teal } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            light: teal[300],
            main: teal[500],
            dark: teal[800],
            contrastText: blueGrey[50],
        },
    }
});

console.log("Loading App");

createRoot(document.getElementById('root')).render(
    <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <App tab="home" />
    </ThemeProvider>
);
