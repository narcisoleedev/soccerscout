import "./passinput.css"


import eye from "../../imagens/eye.webp"

const PassInput = (props) => {
    return(
        <div className="input-pass">
            <input type="password"  id={props.id} onChange={props.handleChange} value = {props.value} required />
            <img src={eye} />
        </div>
    )
}

export default PassInput