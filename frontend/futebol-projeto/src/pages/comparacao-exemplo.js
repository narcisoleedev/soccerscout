import './comparacao-exemplo.css'
import Select from "../components/Select/Select.js"

function ComparacaoExemplo(){
    return (
        <div className='Main'>
        <div className="side"></div>
        <div className='conteudo'>
            <section className="header_exemplo">
                <h1>EXEMPLOS</h1>
                <p> Veja abaixo exemplos de como utilizar as funcionalidades de comparação coletiva e de comparacao 1 x 1</p>
            </section>

            <section className="coletiva_exemplo">
                <h1>EXEMPLO DE COMPARACAO COLETIVA</h1>
                <h2>FILTROS</h2>
                <section className="desc">
                    <p>Escolha até 10 opções de liga, país, posição. Para remover, clique no ícone de "-" ao lado da opção selecionada</p>
                    <p>Escolha as idades mínima e máxima. Clique em confirmar para gerar o gráfico e tabela </p>
                </section>
                
                <section className="coletiva_selects">
                    <Select name = "Liga" options={["Liga baba", "Liga aa"]}/>
                    <Select name = "Liga" options={["Liga baba", "Liga aa"]}/>
                    <Select name = "Liga" options={["Liga baba", "Liga aa"]}/>
                    <Select name = "Liga" options={["Liga baba", "Liga aa"]}/>
                </section>
            </section>
           

            <div className='espaco'>espaço</div>
        </div>
        <div className="side"></div>
</div>
    )
}

export default ComparacaoExemplo