import './comparacao-1x1.css'
import Tabela1v1 from '../../components/Tabela1v1/Tabela1v1'
import { Link } from 'react-router-dom'

function Comparacao1v1(){
    const player = {
        "Jogador": "Fabinho", "Time": "Al-Ittihad","País":"Brasil", "Idade":29, "Posição":"VOL","Car.Amar./90 min.":0.303,"Assist./90min":0.053,"Gols/90 min.":0.053,"Ações/90min":80,"Val. Médio/ Ação":0.006,"Rating":0.480,"Val mercado":"42 M €"
    }
    return (
        <div className='Main'>
            <div className="side"></div>
            <div className='conteudo'>
                <section className="x-exemplo">
                        <h1>COMPARACAO 1X1</h1>
                        <div className='tables-x'>
                            <Tabela1v1 players = {player} isMirrored = {false}/>
                            <Tabela1v1 players = {player} isMirrored = {true}/>
                        </div>
                        
                </section>
                <section className='continue'>
                    <h4>Continue Navegando:</h4>  
                    
                    <span> 
                        <Link to={"/comparacao-exemplo"}>
                            <h4>Exemplo</h4>
                        </Link> 
                    </span>

                    <span> 
                        <Link to={"/comparacao-coletiva"}>
                            <h4>Comparação Coletiva</h4>
                        </Link> 
                    </span>
                </section>
                <div className='espaco'>&nbsp;</div>
            </div>
            <div className="side"></div>
    </div>
    )
}

export default Comparacao1v1