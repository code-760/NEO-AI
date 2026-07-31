import { RouterProvider } from 'react-router';
import { router } from './app.route';
import { Provider } from 'react-redux';
import { store } from './app.Store';
import { useauth } from '../Feature/Auth/hook/userAuth';
import { useEffect } from 'react';

function App() {

  const auth = useauth()

  useEffect(() => {
    auth.hendalgetme()
  }, [])


  
  return (
   
      <RouterProvider router={router} />
  
  );
}

export default App;
