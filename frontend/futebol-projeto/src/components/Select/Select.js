import "./Select.css"
import down_arrow from "../../imagens/down_arrow.png"
import up_arrow from "../../imagens/up_arrow.png"
import plus from "../../imagens/mais.png"
import minus from "../../imagens/minus.png"
import {useState} from "react"
    
const Select = (props) => {  
    const [listVisible, setListVisible] = useState(false)
    const [upArrow, setupArrow] = useState(true)
    const [listEmpty, setUpEmpty] = useState(false)

    const arrowClick = () => {
        setupArrow(!upArrow)
        setListVisible(!listVisible)
    }

    const addClick = (e) =>{
        if((props.options.length - props.filters.length ) <= 1){
            setUpEmpty(true)
            setListVisible(false)
            setupArrow(true)
        }
            
        props.callbackAdd(e.target.dataset.value)
    }

    const removeClick = (e) =>{ 
        setUpEmpty(false)
        props.callbackRemove(e.target.dataset.value)
    }

    const fitered = props.filters && props.filters.length > 0 

    return(
        <div>
            <div className="select_group">
                <h5>{props.name}</h5>
                <span>
                    {props.placeholder} {upArrow ?  
                    <img alt = "down_arrow" src={down_arrow} onClick={arrowClick}></img> :
                    <img alt = "up_arrow" src={up_arrow} onClick={arrowClick}></img>}
                </span>
            </div>

            {listVisible && !listEmpty &&        
                <nav >
                <ul className="options_list">
                    {props.options.filter((option) => !props.filters.includes(option)).map(option =>
                        <li key={option} data-value={option} onClick = {addClick}>{option} <img src={plus} className="option_icon" data-value={option} alt="adicionar" /></li>
                    )}
                </ul>
               
                </nav>
            }    

            {fitered   &&
                <div className="filterWrapper">
                    {props.filters.map(chosen => 
                        <div className="filtered-options" onClick={removeClick}> 
                            <h5>{chosen}</h5> <img src={minus} data-value={chosen}  className="option_icon" alt="remover" />
                        </div>
                    )}
                </div>
            }
        </div>
    )
}

export default Select