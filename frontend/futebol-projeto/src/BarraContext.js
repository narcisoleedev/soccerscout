// BarraContext.js
import React, { createContext, useState } from 'react';

const BarraContext = createContext();

const BarraProvider = ({ children }) => {
  const [barraAberta, setBarraAberta] = useState(false);

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
    <BarraContext.Provider value={{ barraAberta, fecharBarra, abrirBarra }}>
      {children}
    </BarraContext.Provider>
  );
};

//export { BarraContext, BarraProvider };


//NAO TO USANDO ISSO PRA NADA ATUALMENTE