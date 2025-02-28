import React from 'react';
import { createRoot } from 'react-dom/client';
import '../css/index.css';
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App tab="home" />
    </React.StrictMode>
);
