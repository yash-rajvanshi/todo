import React from 'react'
import { Routes, Route } from "react-router-dom";
import Login from './pages/AuthPage.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Home from './pages/Home.jsx';
import Register from './components/Register.jsx';
import AuthPage from './pages/AuthPage.jsx';


const App = () => {
  return (
    <Routes>
      <Route path='/authPage' element={<AuthPage/>} />
      <Route path="/home" element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
    </Routes>
  )
}

export default App
