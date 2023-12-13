import { Link } from 'react-router-dom'
import './redes-sociais.css'

function RedesSociais(){
    return (
        <div className='Main'>
            <div className="side"></div>
            <div className='conteudo'>
                <div className='redes-sociais'>
                    <h2>Ops...</h2>
                    <h3>Nossas redes sociais estarão disponíveis em breve!</h3>
                    <Link to={"/"}>
                        <p>Voltar para página inicial</p>
                    </Link>
                </div>
               
                
                <div className='espaco'>&nbsp;</div>
            </div>
            <div className="side"></div>
    </div>
    )
}

export default RedesSociais