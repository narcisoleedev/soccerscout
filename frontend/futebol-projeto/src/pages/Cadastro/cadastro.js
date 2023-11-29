import './cadastro.css'

function Cadastro(){
    return(
        <div className='Main'>
        <div className="side"></div>
        <div className='conteudo'>
            
            <div className='Formulario_Login'>
                <form action="/caminho/do-seu-script-de-processamento" method="post">
                    <h1> Cadastre-se</h1>
                    {/*Campo de E-mail*/}
                    <label for="email">Endereço de email:</label>
                    <input type="email" id="email" name="email" required>
                    </input>
                    {/*Campo de Nome*/}
                    <label for="nome">Nome de usuário:</label>
                    <input type="text" id="nome" name="nome" required>
                    </input>
                    {/*Campo de Senha*/}
                    <label for="senha">Senha:</label>
                    <input type="password" id="senha" name="senha" required>
                    </input>
                    {/*Campo de Senha 2*/}
                    <label for="senha2">Confirme Sua Senha:</label>
                    <input type="password" id="senha2" name="senha2" required>
                    </input>
                    {/*Botão de envio*/}
                    <button type="submit">Criar Conta</button>
                </form>
            </div>
            <div className='TextoFinal'>
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