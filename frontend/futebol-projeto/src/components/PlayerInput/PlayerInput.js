import "./PlayerInput.css"
import lupa from "../../imagens/lupa.png"
import { useState, useEffect } from "react"

const PlayerInput = () => {

    const [textInput, setTextInput] = useState("")
    

    const changeInput = (event) => {
        setTextInput( event.target.value)
    }

    useEffect( () => {
        console.log(textInput)
    },[textInput])

    return(
        <div>
            <div className="input-group">   
                <input value={textInput} onChange={changeInput} type="text" placeholder="Escreva o nome do jogador desejado"/>
                <img src={lupa} className="input-icon"/>
            </div>


           
        </div>
        
    )
}

export default PlayerInput