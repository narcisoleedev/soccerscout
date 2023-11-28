import './home.css'

//imagens
import bola from "../imagens/bola.png"
import fb from "../imagens/fb.png"
import x from "../imagens/x.png"
import em from "../imagens/em.png"
import falta from "../imagens/falta.png"
import ig from "../imagens/ig.png"

function Home(){
    return (
        <div className="main">
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
                                <div className="icon"><img src={x}/></div>
                                <div className="icon"><img src={ig}/></div>
                                <div className="icon"><img src={fb}/></div>
                                <div className="icon"><img src={em}/></div>
                            </div>
                            <div className="underline"></div>
                        </div>
                    </div>
                    <div className="foto-div">
                        <img src={falta}/>
                    </div>
                </div>
                <div className="buraco">
                    ESPAÇO
                </div>
            </div>
            <div className="side"></div>
        </div>
    )
}

export default Home