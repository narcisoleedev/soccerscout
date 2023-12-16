import "./passinput.css"
import React ,{ useState } from "react"
import eye from "../../imagens/eye.webp"

const PassInput = (props) => {

    const [typeInput, setTypeInput] = useState("password")

    const eyeClick = () => {
        if(typeInput=== "password")
            setTypeInput("text")
        else
            setTypeInput("password")
    }

    return(
        <div className="input-pass">
            <input type={typeInput} autoComplete= {props.autocomplete} id={props.id} onChange={props.handleChange} value = {props.value} required />
            <img src={eye} onClick = {eyeClick} />
        </div>
    )
}

export default PassInput