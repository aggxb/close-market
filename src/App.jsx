import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserProvider from './Contexts/UserProvider';
import './App.css';
import Dashboard from './Pages/Dashboard';
import LocationProvider from './Contexts/LocationProvider';
import MarketProvider from './Contexts/MarketProvider';
import CadastroMercado from './Pages/CadastroMercado';
import SupermercadosCadastrados from './Pages/SupermercadosCadastrados';
import HomeAdministrador from './Pages/HomeAdministrador';
import NaoExiste from './Pages/NaoExiste';

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <div className="content">
          <UserProvider>
            <MarketProvider>
              <LocationProvider>
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
                  <Route path="*" element={<NaoExiste />} />
                </Routes>
              </LocationProvider>
            </MarketProvider>
          </UserProvider>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
