import {useState, useContext, useEffect} from 'react';
import { AuthenticationContext } from './context/Authentication';
import { Navigate, useNavigate } from 'react-router-dom';


const RotaProtegida = ({ element: Element, aviso}) => {
    const {login} = useContext(AuthenticationContext)
    const [verificacaoConcluida, setVerificacaoConcluida] = useState(false);
    const navigate = useNavigate();

    const UserAutenticado = () => {
        if(login) return true;
        return false
      }
    
    useEffect(() => {
        const verificarAutenticacao = async () => {
          // Simula uma verificação de autenticação assíncrona
          // Substitua por sua lógica real
          await new Promise((resolve) => setTimeout(resolve, 500));
          if(!login)navigate('/')
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
    return <Element/>
};

export default RotaProtegida;