import "./PlayerInput.css"
import lupa from "../../imagens/lupa.png"
import { useState, useEffect, useContext } from "react"
import info from '../../info.js'
import { AuthenticationContext } from "../../context/Authentication.js"
import api from "../../api.js"
import fetch from '../../fetch.js'

let nomes = []


const PlayerInput = (props) => {
    const {BuscarNomes} = fetch
    const [player, setPlayer] = useState("")
    const [textInput, setTextInput] = useState("")
    const [playersVisible, setPlayersVisible] = useState(false)
    const [names, setnames] = useState([])
    const [loading,setloading] = useState(true)

    useEffect(() => {
        const fetchNames = async () => {
            const players = await BuscarNomes()
            setnames(players)
            setloading(false)
        }
        fetchNames()
        return () => {}
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
     if(loading){
         return (
             <h2>Carregando nomes...</h2>
         )
    }
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