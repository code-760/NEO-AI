import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router';
import Protected from '../Feature/Auth/Components/Protected.jsx';

const Login = lazy(() => import('../Feature/Auth/pages/Login.jsx'));
const Register = lazy(() => import('../Feature/Auth/pages/Register.jsx'));
const Dashboard = lazy(() => import('../Feature/Chat/pages/Dashboard.jsx'));

const fallback = <div className="hidden" />;

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={fallback}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: '/app',
    element: (
      <Protected>
        <Suspense fallback={fallback}>
          <Dashboard />
        </Suspense>
      </Protected>
    ),
  },
  {
    path: '/register',
    element: (
      <Suspense fallback={fallback}>
        <Register />
      </Suspense>
    ),
  },
]);
