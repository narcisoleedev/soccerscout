import "./TabelaColetiva.css"

const TabelaColetiva = (props) => {
   return(
    <div className="tabela-coletiva">
        <table cellSpacing="0">
            <thead>
                <tr>
                    <th >Rank.</th>
                    <th >Jogador</th>
                    <th >Time</th>
                    <th >País</th>
                    <th >Posição</th>
                    <th >Idade</th>
                    <th >Rating</th>
                    <th >Val. Mercado</th>
                </tr>
            </thead>
            <tbody className="tableContent">
                {props.players.map( player =>
                    <tr key={player.Rank}>
                        <td>{player.Rank}</td>
                        <td>{player.Jogador}</td>
                        <td>{player.Time}</td>
                        <td>{player.País}</td>
                        <td>{player.Posição}</td>
                        <td>{player.Idade}</td>
                        <td>{player.Rating}</td>
                        <td>{player.Valor}</td>
                    </tr>
                )}
                
            </tbody>
        </table>
    </div>
   )
}


export default TabelaColetiva