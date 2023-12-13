import "./PlayerInput.css"
import lupa from "../../imagens/lupa.png"
import { useState, useEffect } from "react"
import info from '../../info.js'


const PlayerInput = (props) => {
    const [player, setPlayer] = useState({})
    const [textInput, setTextInput] = useState("")
    const [playersVisible, setPlayersVisible] = useState(false)

    const {players} = info


    const changeInput = (event) => {
        event.preventDefault()
        setTextInput( event.target.value)
    }

    const choosePlayer = (event) =>{       
        const player = players.filter(player => player.rank === event.target.value)[0]
        setPlayer(player)
        setPlayersVisible(false)
        setTextInput(player.jogador)
    }

    useEffect (() => {
        if(player.jogador !== undefined){
            setPlayersVisible(false)
            props.func(player)

        }
    }, [player])

    useEffect(() => {
        setPlayersVisible(textInput !== "")
    },[textInput])

    return(
        <div>
            <div className="input-group">   
                <input value={textInput} onChange={changeInput} type="text" placeholder="Escreva o nome do jogador desejado"/>
                <img src={lupa} className="input-icon"/>
            </div>

            {
                playersVisible && (textInput != player.jogador)&&
                <div className="player-list">
                    <ul>
                    {players.filter(players => players.jogador.toUpperCase().includes(textInput.toUpperCase())).map( player =>
                        <li value={player.rank} onClick={choosePlayer}>{player.jogador}</li>
                    )}
                    </ul>
                </div>

            }

           
        </div>
        
    )
}

export default PlayerInput