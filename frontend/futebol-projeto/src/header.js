import mb from "./imagens/mb.png"
import logoT from "./imagens/logoF.png"
import './header.Module.css'
import { Link } from 'react-router-dom'
import Barra from "./barra"
import React, { useState, useContext } from 'react';
import { AuthenticationContext } from "./context/Authentication"

function Header(){
    const { login, fecharLogin, abrirLogin } = useContext(AuthenticationContext)
    const [barraAberta,setBarraAberta] = useState(false)
    const fecharBarra = () => {
        // setBarraAberta(prevState => !prevState);
        setBarraAberta(false)
        console.log(`Estado atual: ${barraAberta}`)
      };
      const abrirBarra= () => {
        setBarraAberta(true);
        console.log(`Estado atual: ${barraAberta}`)
      }
    return (
        <div className="header">
        {barraAberta && <Barra fecharBarra={fecharBarra}/>} 
            <div className="mb">                           
                <img src={mb}alt="Logo da IA" onClick={abrirBarra}/>
            </div> 
            
            <div className="logo">
                <Link to='/'>
                    <img src={logoT} alt="Logo da IA"/>
                </Link>
            </div>      
            <div className="nav">
                <Link to='/tecnica'><span class="texto-link">Técnica</span></Link>
                <Link to='/sobre'><span class="texto-link">Sobre</span></Link>
                <Link to ='/comparacao'><span class="texto-link">Comparação </span></Link>
        </div>
            {!login ?(
                <div className="buttons">
                    
                        <Link to='/login'>
                            <button className="login-button" id = "login">login</button>
                        </Link>
                        <Link to='/cadastro'> <button className="signup-button">sign up</button> </Link>
                </div>
            ) : (
                <div className="buttons">
                    
                <Link to='/redes-sociais'>
                    <button className="perfil" id = "perfil">redes sociais</button>
                </Link>
                <Link to='/'> <button className="leave-button" onClick={fecharLogin}>sair</button> </Link>
                </div>
                )
            }
        </div>
    )
}
export default Header