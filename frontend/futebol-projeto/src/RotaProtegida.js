import {useState, useContext, useEffect} from 'react';
import { AuthenticationContext } from './context/Authentication';
import { Navigate } from 'react-router-dom';


const RotaProtegida = ({ element: Element, aviso}) => {
    const {login} = useContext(AuthenticationContext)
    const [verificacaoConcluida, setVerificacaoConcluida] = useState(false);
    const UserAutenticado = () => {
        if(login) return true;
        return false
      }
    
    useEffect(() => {
        const verificarAutenticacao = async () => {
          // Simula uma verificação de autenticação assíncrona
          // Substitua por sua lógica real
          await new Promise((resolve) => setTimeout(resolve, 1300));
          setVerificacaoConcluida(true);
        };
    
        verificarAutenticacao();
      }, []);
    if (!verificacaoConcluida){
        return <div>
            <div className='Main'>
                <div className="side" />
                <div className='conteudo'>
                    <h1>Verificando autenticação...</h1>
                    <div className='buraco'>
                    &nbsp;
                    </div>
                    <div className='buraco'>
                    &nbsp;
                    </div>
                </div>
                <div className="side"/>
            </div>
        </div>
    }
    if (!UserAutenticado()) {
      return (  
      <Navigate
        to={{
          pathname: '/',
          state: { aviso: aviso || 'Você precisa estar logado para acessar esta página.' },
        }}
      /> 
      )
    }
    return <Element/>
};

export default RotaProtegida;