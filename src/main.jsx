import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.jsx'
import { store } from './store/store.js'
import { BrowserRouter } from "react-router-dom";
import TogglerProvider from './context/Toggler.jsx'


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
      <BrowserRouter>
      <TogglerProvider>
        <App />
      </TogglerProvider>
      </BrowserRouter>
    </StrictMode>
  </Provider>
)