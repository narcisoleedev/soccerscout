import './cadastro.css'
import {useState} from 'react'
import { Link } from 'react-router-dom'
import api from '../../api'

function Cadastro(){

    const [errorPass, setErrorPass] = useState(false)
    const [confirmPass, setConfirmPass] = useState("")

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
      });
    const handleChange = (e) => {
        const { name, value } = e.target;
        if(name === "senha2")
        setConfirmPass( value)
        setFormData({ ...formData, [name]: value });
      };
    const handleSubmit = (e) => {
        e.preventDefault();
        if(formData.password !== confirmPass){
            setErrorPass(true)
            return
        } else
            setErrorPass(false)
        const signUp = async () => {
            const response = await api.post('/access/create', formData, {  headers: { "ngrok-skip-browser-warning": "any" } })
        }
        signUp()
      };
    return(
        <div className='Main'>
        <div className="side"></div>
        <div className='conteudo'>
            
            <div className='Formulario_Cadastro'>
                <form onSubmit={handleSubmit}>
                    <h1> Cadastre-se</h1>
                    {/*Campo de E-mail*/}
                    <label for="email">Endereço de email:</label>
                    <input type="email" id="email" name="email" onChange={handleChange} value={formData.email} required>
                    </input>
                    {/*Campo de Nome*/}
                    <label for="nome">Nome de usuário:</label>
                    <input type="text" id="name" name="name" onChange={handleChange} value={formData.name} required>
                    </input>
                    {/*Campo de Senha*/}
                    <label for="senha">Senha:</label>
                    <input type="password" id="password" name="password" onChange={handleChange} value={formData.password} required>
                    </input>
                    {/*Campo de Senha 2*/}
                    <label for="senha2">Confirme Sua Senha:</label>
                    <input type="password" id="senha2" name="senha2" onChange={handleChange} value={formData.password2} required>
                    </input>
                    {errorPass &&
                    <h4 className='error_password'>Senhas não coincidem</h4>}
                    {/*Botão de envio*/}
                    <button type="submit">Criar Conta</button>
                </form>
            </div>
            <div className='TextoFinalCadastro'>
                <p>
                    Já tem cadastro? <Link to='/login'><span className='Verde'>Faça Login</span> </Link>
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

export default Cadastro