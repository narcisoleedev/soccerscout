import { useEffect, useState } from "react"
import PlayerInput from "../PlayerInput/PlayerInput"
import "./Tabela1v1.css"

const Tabela1v1 = (props) => {

    const [player, setPlayer] = useState({})


    const choosePlayer = (choice) => {
        setPlayer(choice)
    }

    useEffect(() => {
        console.log(player)
    }, [player])

    return(
        
        <div className="tabela-x">
            <PlayerInput func = {choosePlayer}/>
            { props.players == undefined ?
                <div>
                      { player.Jogador != undefined ?
                    <table cellSpacing="0">
                        {!props.isMirrored ?
                            <tbody className="normal">
                                {Object.entries(player).map( key =>
                                    key[0] != "Rank" &&
                                    <tr key={key}>
                                        <td>{key[0]}</td>
                                        <td>{key[1]}</td>
                                    </tr>
                                )}
                                
                            </tbody> :
                            <tbody className="mirror">
                            {Object.entries(player).map( key =>
                                key[0] != "Rank" &&
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
                                    key[0] != "Rank" &&
                                    <tr key={key}>
                                        <td>{key[0]}</td>
                                        <td>{key[1]}</td>
                                    </tr>
                                )}
                                
                            </tbody> :
                            <tbody className="mirror">
                            {Object.entries(props.players).map( key =>
                                key[0] != "Rank" &&
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