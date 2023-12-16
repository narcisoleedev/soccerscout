import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'

//Partes fixass
import Header from './header';
import Footer from './footer'

//Páginas
import Home from './pages/Home/home'
import Tecnica from './pages/Tecnica/tecnica';
import Sobre from './pages/Sobre/sobre';
import Comparacao from './pages/Comparacao/comparacao';
import Comparacao1v1 from './pages/Comparacao_1x1/comparacao-1x1';
import ComparacaoColetiva from './pages/Comparacao_coletiva/comparacao-coletiva';
import ComparacaoExemplo from './pages/Comparacao_exemplo/comparacao-exemplo';
import Login from './pages/Login/login';
import Cadastro from './pages/Cadastro/cadastro';
import RedesSociais from './pages/Redes_sociais/redes-sociais';
import { Authentication, AuthenticationContext } from './context/Authentication';
import RotaProtegida from './RotaProtegida';

function App() {
  return (
    <Authentication>
      <Router>
          <Header/>
          <Routes>
              <Route path="/" exact Component={Home} />
              <Route path="/tecnica" Component={Tecnica} />
              <Route path="/sobre" Component={Sobre} />
              <Route
                element={<RotaProtegida element={Comparacao} aviso="Você precisa estar logado para acessar a página de comparação." />}
                path = "/comparacao"
              />
              <Route
                element={<RotaProtegida element={Comparacao1v1} aviso="Você precisa estar logado para acessar a página de comparação." />}
                path = "/comparacao-1x1"
              />
              <Route
                element={<RotaProtegida element={ComparacaoColetiva} aviso="Você precisa estar logado para acessar a página de comparação." />}
                path = "/comparacao-coletiva"
              />
              <Route
                element={<RotaProtegida element={ComparacaoExemplo} aviso="Você precisa estar logado para acessar a página de comparação." />}
                path = "/comparacao-exemplo"
              />
              <Route path="/login" Component={Login}/>
              <Route path="/cadastro" Component={Cadastro}/>
              <Route path="/redes-sociais" Component={RedesSociais}/>
              <Route path="/profile" Component={Profile}/>
        </Routes>
          <Footer/>
      <script src="script.js"></script>
      </Router>
    </Authentication>
  );
}

export default App;