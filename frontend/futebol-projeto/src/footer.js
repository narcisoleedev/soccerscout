import x from "./imagens/x.png"
import em from "./imagens/em.png"
import ig from "./imagens/ig.png"
import fb from "./imagens/fb.png"
import './footer.css'

function Footer(){
    return(
        <div className = "footer">
            <div className="caixa-footer">
                <div className="texto">
                    CONFIRA NOSSAS REDES SOCIAIS!
                </div>
                <div className="icons">
                    <img src={x} alt="Logo da IA"/>
                    <img src={ig} alt="Logo da IA"/>
                    <img src={fb} alt="Logo da IA"/>
                    <img src={em} alt="Logo da IA"/>
                </div>
            </div>
        </div>
    )
}

export default Footer