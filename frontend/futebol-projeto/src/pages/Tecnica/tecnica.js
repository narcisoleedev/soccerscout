import './tecnica.css'

function Tecnica(){
    return (
        <div className='Main'>
            <div className="side"></div>
            <div className='conteudo'>
                <h1> Técnica </h1>
                <p>
                Os ratings apresentados aqui para os jogadores foram obtidos a partir de um processo de Machine Learning que utiliza o algoritmo Catboost, 
                desenvolvido pela empresa russa Yandex. O algoritmo usa gradient boosting para formar árvores de decisão e, consequentemente, random forests. 
                Ele classifica a probabilidade um time marcar e sofrer um gol após determinada ação e, a partir dessa variação, atribui um valor para uma ação específica de um jogador.
                Dessa forma, uma ação terá um valor positivo se aumentou a probabilidade do time do jogador fazer um gol ou se diminuiu a probabilidade do time de tal jogador sofrer um gol.
                Da mesma forma, uma ação recebe um valor negativo caso aconteça o contrário do que foi citado anteriormente.
                </p>
                <p>
                Nosso trabalho busca, de certa forma, replicar o trabalho feito no artigo “Actions Speak Louder Than Goals: Valuing Player Actions in Soccer”, sendo a principal inspiração para nosso trabalho, em que os autores realizam essa classificação dos jogadores e suas ações de maneira inovadora e 
                conseguem obter resultados extremamente satisfatórios. Os autores do artigo original são:
                </p>
                <p>
                Tom Decroos (KU Leuven) <br/>
                Lotte Bransen (SciSports)<br/>
                Jan Van Haaren (SciSports)<br/>
                Jesse Davis (KU Leuven)
                </p>
                <div className='buraco'>
                    &nbsp;
                </div>
            </div>
            <div className="side"></div>
        </div>
    )
}
export default Tecnica