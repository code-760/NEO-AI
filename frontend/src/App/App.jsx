import { RouterProvider } from 'react-router';
import { router } from './app.route';
import { Provider } from 'react-redux';
import { store } from './app.Store';

function App() {

  
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
