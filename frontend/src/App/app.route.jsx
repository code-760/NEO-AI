import { createElement } from 'react';
import { createBrowserRouter } from 'react-router';
import Login from '../Feature/Auth/pages/Login.jsx';
import Register from '../Feature/Auth/pages/Register.jsx';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <h1>welcome to home</h1>
  },
  {
    path: '/register',
    element: <Register />
  },
]);
