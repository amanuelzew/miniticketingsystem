import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from "react-router";
import Login from './Login.tsx';
import Signup from './Signup.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Route element={<App />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Signup />} />
      </Route>
    </BrowserRouter>
  </StrictMode>,
)
