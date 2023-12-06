import x from "./imagens/x.png"
import em from "./imagens/em.png"
import ig from "./imagens/ig.png"
import fb from "./imagens/fb.png"
import './footer.css'
import { Link } from 'react-router-dom'

function Footer(){
    return(
        <div className = "footer">
            <div className="caixa-footer">
                <div className="texto">
                    CONFIRA NOSSAS REDES SOCIAIS!
                </div>
                <div className="social-icons">
                    <Link to={"/redes-sociais"} className="icons">
                        <img src={x}/>
                    </Link>

                    <Link to={"/redes-sociais"} className="icons">
                        <img src={ig}/>

                    </Link>

                    <Link to={"/redes-sociais"}  className="icons">
                       <img src={fb}/>
                    </Link>

                    <Link to={"/redes-sociais"}  className="icons">
                        <img src={em}/>
                    </Link>                                
                </div>
            </div>
        </div>
    )
}

export default Footer