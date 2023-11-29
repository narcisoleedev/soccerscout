import './comparacao.css'
import { Link } from 'react-router-dom'

function Comparacao(){
    return(
        <div className='Main'>
            <div className="side"></div>
            <div className='conteudo'>
                <h1>Compare Jogadores</h1>
                <div className='meio'>
                    <div className='caixa-comparacao'>
                        <h1>Coletiva</h1>
                        <p>
                            Compare o desempenho de dezenas de jogadores ao mesmo tempo!
                        </p>
                        <br/>
                        <p>
                            Defina uma série de filtros personalizados e verifique quais jogadores se destacam por meio de gráficos e tabelas.
                        </p>
                        <br/>
                        <Link to='/comparacao-coletiva'>
                            <div className='botao_caixa'>
                                Coletiva
                            </div>
                        </Link>
                    </div>
                    <div className='caixa-comparacao'>
                        <h1>1x1</h1>
                        <p>
                            Compare o desempenho de dois jogadores detalhadamente!
                        </p>
                        <br/>
                        <p>
                            Escolha dois jogadores específicos de sua preferência, veja suas informações detalhadas e 
                            qual se sai melhor em determinados quesitos
                        </p>
                        <br/>
                        <Link to='/comparacao-1x1'>
                            <div className='botao_caixa'>
                                1x1
                            </div>
                        </Link>
                    </div>
                    <div className='caixa-comparacao'>
                        <h1>Exemplo</h1>
                        <p>
                            Não tem certeza do que esperar ou como essas comparações lhe serão apresentadas? Sem problema!
                        </p>
                        <p>
                            Veja exemplos claros e bem definidos dos gráficos e tabelas utilizados para facilitar a comparação dos jogadores.
                        </p>
                        <br/>
                        <Link to='/comparacao-exemplo'>
                            <div className='botao_caixa'>
                                Exemplo
                            </div>
                        </Link>
                    </div>
                </div>
                <div className='espaco'>espaço</div>
            </div>
            <div className="side"></div>
        </div>
    )
}

export default Comparacao