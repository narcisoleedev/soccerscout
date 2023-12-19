import { Link } from 'react-router-dom'
import './login.css'
import {useState, useContext, useEffect} from 'react'
import api from '../../api'
import { AuthenticationContext } from '../../context/Authentication'
import { useNavigate } from 'react-router-dom'

function Login(){
    const navigate = useNavigate()
    const {abrirLogin,defineToken} = useContext(AuthenticationContext)
    const [failLogin,setfailLogin] = useState(false)

    const [formDataLogin, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formDataLogin, [name]: value });
    };

    useEffect(() => {
       
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const checkLogin = async () => {
            try{
                const response = await api.post("/access/login",formDataLogin,{ headers: { "ngrok-skip-browser-warning": "any" }})

                const {data} = response
                return data.accessToken
            }catch(error){
                console.error("ERROR CHECKLOGIN",error)
                setfailLogin(true)
                return undefined
            }
        }
        const x = await checkLogin()
        if(x!=undefined){
            defineToken(x)
            abrirLogin()
            navigate('/')
        }
        console.log("Response: ",x)
       
        // abrirLogin()
        // console.log('Dados do formulário:', formDataLogin);
        // navigate('/')
      };
    return(
        <div className='Main'>
        <div className="side"></div>
        <div className='conteudo'>
            
            <div className='Formulario_Login'>
                <form onSubmit={handleSubmit}>
                    <h1> Login</h1>
                    {/*Campo de E-mail*/}
                    <label for="email">Endereço de email:</label>
                    <br/>
                    <input type="email" id="email" name="email" onChange={handleChange} value={formDataLogin.email} required>
                    </input>
                    <br/>
                    {/*Campo de Senha*/}
                    <label for="senha">Senha:</label>
                    <input type="password" id="senha" name="password" onChange={handleChange} value={formDataLogin.password} required>
                    </input>
                    <p id ="forgot" className='Verde'>Esqueci minha Senha</p>
                    <br/>
                    {/*Botão de envio*/}
                    {failLogin && <p className='falha'>Usuario ou senha incorretos</p>}
                    <button type="submit">Entrar</button>
                </form>
            </div>
            <div className='TextoFinalLogin'>
                <p>
                    Ainda não tem cadastro? 
                    <Link to={"/cadastro"}>
                        <span className='Verde'>Cadastre-se Aqui!</span>
                    </Link>
                </p> 
                
                
            </div>
            <div className="buraco">
                    &nbsp;
            </div>
        </div>
        <div className="side"></div>
</div>
    )
}

export default Login