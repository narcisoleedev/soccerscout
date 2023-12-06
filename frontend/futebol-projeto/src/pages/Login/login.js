import { Link } from 'react-router-dom'
import './login.css'

function Login(){
    return(
        <div className='Main'>
        <div className="side"></div>
        <div className='conteudo'>
            
            <div className='Formulario_Login'>
                <form action="/caminho/do-seu-script-de-processamento" method="post">
                    <h1> Login</h1>
                    {/*Campo de E-mail*/}
                    <label for="email">Endereço de email:</label>
                    <br/>
                    <input type="email" id="email" name="email" required>
                    </input>
                    <br/>
                    {/*Campo de Senha*/}
                    <label for="senha">Senha:</label>
                    <input type="password" id="senha" name="senha" required>
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
            <div className='espaco'>espaço</div>
        </div>
        <div className="side"></div>
</div>
    )
}

export default Login