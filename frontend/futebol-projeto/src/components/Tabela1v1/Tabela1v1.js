import { useEffect, useState } from "react"
import PlayerInput from "../PlayerInput/PlayerInput"
import "./Tabela1v1.css"
import fetch from '../../fetch'
import tratamento from "../../TratarDados"

const Tabela1v1 = (props) => {
    const [player, setPlayer] = useState('')
    const [DadosPlayer, setDadosPlayer] = useState({})
    const {MudarDataTabela} = tratamento

    const {Buscar1v1} = fetch

    const choosePlayer = (choice) => {
        setPlayer(choice)
    }

    useEffect(() => {
        const fetchPlayer = async (name) => {
            try{
                const response = await Buscar1v1(name)
                const {data} = response
                const dataArrumado = MudarDataTabela(data)
                setDadosPlayer(dataArrumado)
            }catch(error){
                console.error("Erro no fetchPlayer:",error)
            }     
        }
        fetchPlayer(player)
        console.log(DadosPlayer)
    }, [player])

    return(
        
        <div className="tabela-x">
            <PlayerInput func = {choosePlayer}/>
            { props.players == undefined ?
                <div>
                      { DadosPlayer.Jogador != undefined ?
                    <table cellSpacing="0">
                        {!props.isMirrored ?
                            <tbody className="normal">
                                {Object.entries(DadosPlayer).map( key =>
                                    
                                    <tr key={key}>
                                        <td>{key[0]}</td>
                                        <td>{key[1]}</td>
                                    </tr>
                                )}
                                
                            </tbody> :
                            <tbody className="mirror">
                            {Object.entries(DadosPlayer).map( key =>
                            
                                <tr key={key}>
                                    <td>{key[1]}</td>
                                    <td>{key[0]}</td>
                                </tr>
                            )}
                            
                            </tbody>
                        }
                    </table> :
                    <div className="placeholder-x">
                        <h3>Escreva o nome de um jogador acima para comparar com o jogador ao lado</h3>
                    </div>

                }
                </div>
               :
               <div>
                    <table cellSpacing="0">
                        {!props.isMirrored ?
                            <tbody className="normal">
                                {Object.entries(props.players).map( key =>
                                    
                                    <tr key={key}>
                                        <td>{key[0]}</td>
                                        <td>{key[1]}</td>
                                    </tr>
                                )}
                                
                            </tbody> :
                            <tbody className="mirror">
                            {Object.entries(props.players).map( key =>
                                
                                <tr key={key}>
                                    <td>{key[1]}</td>
                                    <td>{key[0]}</td>
                                </tr>
                            )}
                            
                            </tbody>
                        }
                    </table>
               </div>

            }
            
           
        </div>
    )
}

export default Tabela1v1