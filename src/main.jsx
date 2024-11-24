import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import { Provider } from 'react-redux';
import store from './services/app/store.js';
import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import './index.css';
import './App.css';
import { StateContextProvider } from './context/StateContext.jsx';

// Define the theme object
const theme = createTheme({
   /** Put your mantine theme override here */
 });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <StateContextProvider>
          <MantineProvider theme={theme}>
            <NextUIProvider>
              <App />
            </NextUIProvider>
          </MantineProvider>
        </StateContextProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
