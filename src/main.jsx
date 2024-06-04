import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ThemeToggleProvider } from './contexts/ThemeToggleProvider.jsx'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeToggleProvider>
      <App />
    </ThemeToggleProvider>
  </React.StrictMode>
)
 root.render(
  <React.StrictMode>
    <ThemeToggleProvider>
      <App />
    </ThemeToggleProvider>
  </React.StrictMode> 
)

