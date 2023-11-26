import "./Select.css"

const Select = (props) => {
    return(
        <div className="select_group">
            <h5>{props.name}</h5>
            <select> 
                {props.options.map(option => <option value= {option} key = {option}>{option}</option>)}
            </select>
        </div>
        
    )
}

export default Select