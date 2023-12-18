import "./PlayerInput.css"
import lupa from "../../imagens/lupa.png"
import { useState, useEffect, useContext } from "react"
import info from '../../info.js'
import { AuthenticationContext } from "../../context/Authentication.js"
import api from "../../api.js"

let nomes = []


const PlayerInput = (props) => {
    const [player, setPlayer] = useState("")
    const [textInput, setTextInput] = useState("")
    const [playersVisible, setPlayersVisible] = useState(false)
    const [names, setnames] = useState([])

    useEffect(() => {
        const fetchNames = async () => {
            const { data } = await api.get('/player', { headers: { "ngrok-skip-browser-warning": "any" } })
            const dataPlayers = data.players
            let players = []
            dataPlayers.map((player) => {
                players.push(player.name)
            })
            setnames(players)
        }
        setnames(info.names)

        //fetchNames()
        //return () => {}
    }, [])
   
    const changeInput = (event) => {
        event.preventDefault()
        setTextInput(event.target.value)
    }

    const choosePlayer = (event) => {
        const player = names.filter(player => player === event.target.innerHTML)[0]
        setPlayer(player)
        setPlayersVisible(false)
        setTextInput(player)
    }

    useEffect(() => {
        if (player !== undefined) {
            setPlayersVisible(false)
            props.func(player)

        }
    }, [player])

    useEffect(() => {
        setPlayersVisible(textInput !== "")
    }, [textInput])

    return (
        <div>
            <div className="input-group">
                <input value={textInput} onChange={changeInput} type="text" placeholder="Escreva o nome do jogador desejado" />
                <img src={lupa} className="input-icon" />
            </div>

            {
                playersVisible && (textInput != player) &&
                <div className="player-list">
                    <ul>
                        {names.filter(players => players.toUpperCase().includes(textInput.toUpperCase())).map(player =>
                            <li value={player} onClick={choosePlayer}>{player}</li>
                        )}
                    </ul>
                </div>

            }


        </div>

    )
}

export default PlayerInput