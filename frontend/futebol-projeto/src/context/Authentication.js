// Authentication.js
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import api from '../api';

const AuthenticationContext = createContext();

const Authentication = ({ children }) => {
  const [token, setToken] = useState()
  const [login, setLogin] = useState(false);


  const defineToken = (newToken) => {
    setToken(newToken)
  }

  useEffect( () => {
    if(token){
      axios.defaults.headers.common["Authorization"] = "Bearer " + token
      localStorage.setItem("token",token)
    
        
      
    } else{
      delete axios.defaults.headers
      localStorage.removeItem("token")
    }

  },[token])

  const fecharLogin = () => {
    // setBarraAberta(prevState => !prevState);
    setLogin(false)
    console.log(`Estado atual login: ${login}`)
  };
  const abrirLogin= () => {
    setLogin(true);
    console.log(`Estado atual login: ${login}`) 
  }

  return (
    <AuthenticationContext.Provider value={{ login, token,fecharLogin, abrirLogin }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export { Authentication, AuthenticationContext }; // Exportando o contexto


//NAO TO USANDO ISSO PRA NADA ATUALMENTE