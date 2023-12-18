import './index.css';
// import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { App } from './App';
import { TripDetails } from './components/TripDetails';

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: ''
      }
    })
  }
});

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>Oops!! Page not found!</div>
  },
  {
    path: '/trips/:id',
    element: <TripDetails />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  // In development mode React.StrictMode is helpful but renders and runs effects extra time
  // Reasons why this happens can be found  here https://react.dev/reference/react/StrictMode#usage
  // However, one of the acceptance criteria is to cache responses and because it may lead to doubled api calls I've decided
  // to comment it out
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </QueryClientProvider>
  // </React.StrictMode>
);
