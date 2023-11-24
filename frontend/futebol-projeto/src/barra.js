import './barra.css'
import logo from './imagens/logoF.png'
import { Link } from 'react-router-dom'
import x from './imagens/x.png'
import ig from './imagens/ig.png'
import fb from './imagens/fb.png'
import em from './imagens/em.png'



function Barra({fecharBarra}){
    // const {fecharBarra} = useContext(BarraContext)
    return(
        <div className="Barra">
            <div className="cima_barra">
                <div className='img_logo'>
                    <img src={logo} alt='logo' id='logo_barra'/>
                </div>
                <div className='fechar'>
                    <span onClick={fecharBarra} id='fechar_barra'>x</span> 
                </div>             
            </div>
            <div className='meio_barra'>
                <div className='meio_texto'> 
                    <Link to='/tecnica'>
                        <span onClick={fecharBarra}> Técnica </span>
                    </Link>
                </div>
                <div className='meio_texto'> 
                    <Link to='/sobre'>
                        <span onClick={fecharBarra}> Sobre </span>
                    </Link>
                </div>
                <div className='meio_texto'>
                    <Link to='/comparacao'> 
                        <span onClick={fecharBarra}> Comparação </span>
                    </Link>    
                </div>
                <div className='meio_texto2'>
                    <Link to='/comparacao-coletiva'> 
                        <span onClick={fecharBarra}> Comparação Coletiva </span>
                    </Link>
                </div>
                <div className='meio_texto2'>
                    <Link to='/comparacao-1x1'> 
                        <span onClick={fecharBarra}> Comparação 1x1 </span>
                    </Link>
                </div>
                <div className='meio_texto2'>
                    <Link to='/comparacao-exemplo'> 
                        <span onClick={fecharBarra}> Comparação Exemplo</span> 
                    </Link>
                </div>
            
            </div>
            <div className='login_barra'>
                <div className='login_texto'>
                    <Link to='/login'>
                        <span onClick={fecharBarra}> Login </span>
                    </Link>
                </div>
                <div className='login_texto'>
                <Link to='/cadastro'>
                        <span onClick={fecharBarra}> Sign up </span>
                    </Link>
                </div>
            </div>
            <div className='sair_barra'>
                <span onClick={fecharBarra}> Sair </span>
            </div>
            <div className='baixo_barra'>
                <div className='icons_barra'>
                    <img src={x} alt='icon x' id='first_img'/>
                    <img src={ig} alt='icon ig'/>
                    <img src={fb} alt='icon fb'/>
                    <img src={em} alt='icon em'/>
                </div>
            </div>
        </div>
    )
}

export default Barra