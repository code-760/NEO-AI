import { RouterProvider } from 'react-router';
import { router } from './app.route';
import { useauth } from '../Feature/Auth/hook/userAuth';
import { useEffect } from 'react';

const scheduleIdleTask = (callback) => {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(callback);
    return;
  }

  setTimeout(callback, 0);
};

function App() {
  const auth = useauth();

  useEffect(() => {
    scheduleIdleTask(() => {
      auth.hendalgetme();
    });
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
