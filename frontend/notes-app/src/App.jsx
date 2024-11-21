import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';

const router = createBrowserRouter(
  [
    { path: '/', element: <Home /> },
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <SignUp /> },
  ],
  {
    future: {
      v7_startTransition: true, // Enable the startTransition future flag
    },
  }
);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
