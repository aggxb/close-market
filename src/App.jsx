import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserProvider from './Contexts/UserProvider';
import './App.css';
import Dashboard from './Pages/Dashboard';
import LocationProvider from './Contexts/LocationProvider';
import MarketProvider from './Contexts/MarketProvider';
import CadastroMercado from './Pages/CadastroMercado';
import SupermercadosCadastrados from './Pages/SupermercadosCadastrados';
import HomeAdministrador from './Pages/HomeAdministrador';

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <div className="content">
          <UserProvider>
            <LocationProvider>
              <MarketProvider>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="home" element={<HomeAdministrador />} />
                  <Route
                    path="supermercado"
                    element={<SupermercadosCadastrados />}
                  />
                  <Route
                    path="supermercado/:id"
                    element={<CadastroMercado />}
                  />
                </Routes>
              </MarketProvider>
            </LocationProvider>
          </UserProvider>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
