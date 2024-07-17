import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App'; // Główny komponent aplikacji
import { dataLoader } from './loaders/dataLoader'; // Loader do pobierania danych

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    loader: dataLoader,
  },
]);
