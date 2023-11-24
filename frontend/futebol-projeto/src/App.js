import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'

//Partes fixass
import Header from './header';
import Footer from './footer'

//Páginas
import Home from './pages/home'
import Tecnica from './pages/tecnica';
import Sobre from './pages/sobre';
import Comparacao from './pages/comparacao';
import Comparacao1v1 from './pages/comparacao-1x1';
import ComparacaoColetiva from './pages/comparacao-coletiva';
import ComparacaoExemplo from './pages/comparacao-exemplo';
import Login from './pages/login';
import Cadastro from './pages/cadastro';


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
        </Routes>
        <Footer/>
    <script src="script.js"></script>
    </Router>
  );
}

export default App;