import './home.css'

//imagens
import fb from "../../imagens/fb.png"
import x from "../../imagens/x.png"
import em from "../../imagens/em.png"
import falta from "../../imagens/falta.png"
import ig from "../../imagens/ig.png"
import { Link } from 'react-router-dom'
import info from '../../info'
import api from '../../api'
import { useEffect } from 'react'

function Home(){
    const {nomes} = info
    console.log(nomes)
    return (
        <div className="Main">
            <div className="side"></div>
            <div className="conteudo">
                <div className="imagem_e_texto">
                    <div className="content">
                        <div className="texto">
                        <b><p id="title">Visão mais detalhada e apurada sobre o <br/>
                        desempenho dos jogadores</p></b> 
                            <h1>Simples e eficaz.</h1>
                        <div id="frase-div">
                            <p id="frase">Nosso software utiliza machine learning para atribuir valores as ações dos jogadores.
                            Descubra quais jogadores contribuem mais para um gol, indepdente de sua posição.
                            Encontre jogadores subvalorizados, futuros talentos e o potencial novo reforço de seu time!</p></div>
                        </div>
                        <br/><br/><br/>
                        <div id="barra_icons">
                            <div className="nav2">
                                <Link to={"/redes-sociais"}>
                                    <div className="rede-social-icon"><img src={x}/></div>
                                </Link>

                                <Link to={"/redes-sociais"}>
                                    <div className="rede-social-icon"><img src={ig}/></div>

                                </Link>

                                <Link to={"/redes-sociais"}>
                                    <div className="rede-social-icon"><img src={fb}/></div>
                                </Link>

                                <Link to={"/redes-sociais"}>
                                    <div className="rede-social-icon"><img src={em}/></div>
                                </Link>                                
                            </div>
                            <div className="underline"></div>
                        </div>
                    </div>
                    <div className="foto-div">
                        <img className="picture" src={falta}/>
                    </div>
                </div>
                <div className="buraco">
                    &nbsp;
                </div>
            </div>
            <div className="side"></div>
        </div>
    )
}

export default Home