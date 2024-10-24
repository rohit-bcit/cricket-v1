import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import router from './routes/router.jsx';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import the Provider
import store from './redux/store.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}> {/* Wrap RouterProvider with Provider */}
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
