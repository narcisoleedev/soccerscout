import PlayerInput from "../PlayerInput/PlayerInput"
import "./Tabela1v1.css"

const Tabela1v1 = (props) => {
    return(
        <div className="tabela-x">
            <PlayerInput />
            <table cellSpacing="0">
                {!props.isMirrored ?
                    <tbody className="normal">
                        {Object.entries(props.players).map( key =>
                            <tr key={key}>
                                <td>{key[0]}</td>
                                <td>{key[1]}</td>
                            </tr>
                        )}
                        
                    </tbody> :
                     <tbody className="mirror">
                     {Object.entries(props.players).map( key =>
                         <tr key={key}>
                             <td>{key[1]}</td>
                             <td>{key[0]}</td>
                         </tr>
                     )}
                     
                    </tbody>
                }
            </table>
           
        </div>
    )
}

export default Tabela1v1