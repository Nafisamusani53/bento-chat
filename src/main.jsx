import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers/index.js'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import AuthListener from './components/Auth/AuthListener.jsx'

const store = configureStore({
  reducer: rootReducer
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthListener />
        <App />
        <Toaster />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
