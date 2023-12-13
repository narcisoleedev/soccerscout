import mb from "./imagens/mb.png"
import logoT from "./imagens/logoF.png"
import './header.Module.css'
import { Link } from 'react-router-dom'
import Barra from "./barra"
import React, { useState } from 'react';

function Header(){
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
                <Link to='/tecnica'>Técnica</Link>
                <Link to='/sobre'>Sobre</Link>
                <Link to ='/comparacao'>Comparação </Link>
        </div>
            <div className="buttons">
                <Link to='/login'>
                    <button className="login-button" id = "login">login</button>
                </Link>
                <Link to='/cadastro'> <button className="signup-button">sign up</button> </Link>
            </div>
        </div>
    )
}
export default Header