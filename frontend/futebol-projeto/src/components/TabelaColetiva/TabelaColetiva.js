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
                    <tr key={player.rank}>
                        <td>{player.rank}</td>
                        <td>{player.jogador}</td>
                        <td>{player.time}</td>
                        <td>{player.pais}</td>
                        <td>{player.posicao}</td>
                        <td>{player.idade}</td>
                        <td>{player.rating}</td>
                        <td>{player.valor}</td>
                    </tr>
                )}
                
            </tbody>
        </table>
    </div>
   )
}


export default TabelaColetiva