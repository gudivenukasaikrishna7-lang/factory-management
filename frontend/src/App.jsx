import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Machines from './pages/Machines';
import Workers from './pages/Workers';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Production from './pages/Production';
import Maintenance from './pages/Maintenance';
import Alerts from './pages/Alerts';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="machines" element={<Machines />} />
            <Route path="workers" element={<Workers />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />
            <Route path="production" element={<Production />} />
            <Route path="maintenance" element={<Maintenance />} />
            <Route path="alerts" element={<Alerts />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
