import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { NextUIProvider } from "@nextui-org/react";
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { StateContextProvider } from './context/StateContext.jsx';
import { Provider } from 'react-redux';
import store from './services/app/store.js';

import './index.css'
import './App.css';
createRoot(document.getElementById('root')).render(
   <BrowserRouter>
     <Provider store={store}>
     <StateContextProvider>
     <NextUIProvider>
        <MantineProvider>
        <StrictMode>
            <App />
         </StrictMode>
        </MantineProvider>
      </NextUIProvider>
     </StateContextProvider>
     </Provider>
   </BrowserRouter>
)
