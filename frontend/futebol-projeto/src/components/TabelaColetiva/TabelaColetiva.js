import "./TabelaColetiva.css"

const TabelaColetiva = (props) => {
   return(
    <div className="tabela-coletiva">
        <table cellSpacing="0">
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Jogador</th>
                    <th>Posição</th>
                    <th>Time</th>
                    <th>País</th>
                    <th>Valor</th>
                    <th>Idade</th>
                    <th>Assist</th>
                    <th>Gols/90min</th>
                    <th>Ações/90min</th>
                    <th>Val. Médio/Ação</th>
                    <th>Rating</th>
                    
                </tr>
            </thead>
            <tbody className="tableContent">
                {props.players.map( player =>
                    <tr key={player.Rank}>
                        <td>{player.Rank}</td>
                        <td>{player.Jogador}</td>
                        <td>{player.Posição}</td>
                        <td>{player.Time}</td>
                        <td>{player.País}</td>
                        <td>{player.Valor}</td>
                        <td>{player.Idade}</td>
                        <td>{player.Assist}</td>
                        <td>{player.Gols}</td>
                        <td>{player.Acoes}</td>
                        <td>{player.ValorAcao}</td>
                        <td>{player.Rating}</td>
                       
                    </tr>
                )}
                
            </tbody>
        </table>
    </div>
   )
}


export default TabelaColetiva