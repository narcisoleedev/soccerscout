import "./PlayerInput.css"
import lupa from "../../imagens/lupa.png"
import { useState, useEffect, useContext } from "react"
import info from '../../info.js'
import { AuthenticationContext } from "../../context/Authentication.js"
import api from "../../api.js"

let nomes = []

async function GetPlayerNames() {
    const { data } = await api.get('/player', { headers: { "ngrok-skip-browser-warning": "any" } })
    const dataPlayers = data.players
    let players = []
    dataPlayers.map((player) => {
        players.push(player.name)
    })
    return players
}
const PlayerInput = async (props) => {
    useEffect(async ()=>{
        nomes = await GetPlayerNames()
    },[])
    //const [player, setPlayer] = useState({})
    const [textInput, setTextInput] = useState("")
    //const [playersVisible, setPlayersVisible] = useState(false)
    //pegando nomes
    console.log(nomes)
    const changeInput = (event) => {
        event.preventDefault()

        setTextInput(event.target.value)
    }

    // const choosePlayer = (event) =>{       
    //     const player = players.filter(player => player.Rank === event.target.value)[0]
    //     setPlayer(player)
    //     setPlayersVisible(false)
    //     setTextInput(player.Jogador)
    // }

    // useEffect (() => {
    //     if(player.Jogador !== undefined){
    //         setPlayersVisible(false)
    //         props.func(player)

    //     }
    // }, [player])

    // useEffect(() => {
    //     setPlayersVisible(textInput !== "")
    // },[textInput])

    return (
        <div>
            <div className="input-group">
                <input value={textInput} onChange={changeInput} type="text" placeholder="Escreva o nome do jogador desejado" />
                <img src={lupa} className="input-icon" />
            </div>

            {/* {
                playersVisible && (textInput != player.Jogador)&&
                <div className="player-list">
                    <ul>
                    {players.filter(players => players.Jogador.toUpperCase().includes(textInput.toUpperCase())).map( player =>
                        <li value={player.Rank} onClick={choosePlayer}>{player.Jogador}</li>
                    )}
                    </ul>
                </div>

            } */}


        </div>

    )
}

export default PlayerInput