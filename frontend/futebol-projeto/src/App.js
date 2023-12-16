import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'

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
import Profile from './pages/Profile/profile';


function App() {
  return (
    <Router>
        <Header/>
        <Routes>
            <Route path="/" exact Component={Home} />
            <Route path="/tecnica" Component={Tecnica} />
            <Route path="/sobre" Component={Sobre} />
            <Route path="/comparacao" Component={Comparacao} />
            <Route path="/comparacao-1x1" Component={Comparacao1v1}/>
            <Route path="/comparacao-coletiva" Component={ComparacaoColetiva}/>
            <Route path="/comparacao-exemplo" Component={ComparacaoExemplo}/>
            <Route path="/login" Component={Login}/>
            <Route path="/cadastro" Component={Cadastro}/>
            <Route path="/redes-sociais" Component={RedesSociais}/>
            <Route path="/profile" Component={Profile}/>
        </Routes>
        <Footer/>
    <script src="script.js"></script>
    </Router>
  );
}

export default App;