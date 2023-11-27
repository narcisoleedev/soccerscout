import "./Select.css"
import down_arrow from "../../imagens/down_arrow.png"
import up_arrow from "../../imagens/up_arrow.png"
import {useState} from "react"
import { Icon } from '@iconify/react';
const Select = (props) => {
    const [listVisible, setListVisible] = useState(false)
    const [upArrow, setupArrow] = useState(true)

    const arrowClick = () => {
        setupArrow(!upArrow)
        setListVisible(!listVisible)
    }


    return(
        <div>
            <div className="select_group">
                <h5>{props.name}</h5>
                <span>
                    Selecione uma {props.name} {upArrow ?  
                    <img alt = "down_arrow" src={down_arrow} onClick={arrowClick}></img> :
                    <img alt = "up_arrow" src={up_arrow} onClick={arrowClick}></img>}
                </span>
            </div>

            {listVisible ?        <nav >
                <ul className="options_list">
                    {props.options.map(option =>
                            <li onClick = {console.log(option)}>{option} <Icon className="option_icon" icon="ic:baseline-plus" /></li>
                    )}
                </ul>
               
            </nav> : <div></div>}              
          

        </div>
                

          
        
    )
}

export default Select