import { Link } from 'react-router-dom'
import './login.css'
import {useState} from 'react'
import api from '../../api'

function Login(){
    const [formDataLogin, setFormData] = useState({
        email: '',
        senha: '',
      });
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formDataLogin, [name]: value });
      };
    const handleSubmit = (e) => {
        e.preventDefault();
        // Aqui você pode adicionar lógica para enviar os dados para o servidor
        api.get();
        console.log('Dados do formulário:', formDataLogin);
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
                    <input type="password" id="senha" name="senha" onChange={handleChange} value={formDataLogin.senha} required>
                    </input>
                    <p id ="forgot" className='Verde'>Esqueci minha Senha</p>
                    <br/>
                    {/*Botão de envio*/}
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