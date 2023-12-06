import './cadastro.css'
import {useState} from 'react'

function Cadastro(){
    const [formData, setFormData] = useState({
        email: '',
        nome: '',
        senha: '',
        senha2: '',
      });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    const handleSubmit = (e) => {
        e.preventDefault();
        // Aqui você pode adicionar lógica para enviar os dados para o servidor
        console.log('Dados do formulário:', formData);
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
                    <input type="text" id="nome" name="nome" onChange={handleChange} value={formData.nome} required>
                    </input>
                    {/*Campo de Senha*/}
                    <label for="senha">Senha:</label>
                    <input type="password" id="senha" name="senha" onChange={handleChange} value={formData.senha} required>
                    </input>
                    {/*Campo de Senha 2*/}
                    <label for="senha2">Confirme Sua Senha:</label>
                    <input type="password" id="senha2" name="senha2" onChange={handleChange} value={formData.senha2} required>
                    </input>
                    {/*Botão de envio*/}
                    <button type="submit">Criar Conta</button>
                </form>
            </div>
            <div className='TextoFinalCadastro'>
                <p>
                    Já tem cadastro? <span className='Verde'>Faça Login</span>
                </p> 
                
                
            </div>
            <div className='espaco'>espaço</div>
        </div>
        <div className="side"></div>
    </div>
    )
}

export default Cadastro