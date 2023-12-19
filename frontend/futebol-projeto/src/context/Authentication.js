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
      localStorage.setItem("token",token)
    
        
      
    } else{
      delete axios.defaults.headers
      localStorage.removeItem("token")
    }

  },[token])

  const fecharLogin = () => {
    // setBarraAberta(prevState => !prevState);
    setLogin(false)
    localStorage.removeItem("token")
  };
  const abrirLogin= () => {
    setLogin(true);
  }

  return (
    <AuthenticationContext.Provider value={{ login, token,fecharLogin, abrirLogin, defineToken }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export { Authentication, AuthenticationContext }; // Exportando o contexto

