import './comparacao-exemplo.css'
import Select from "../../components/Select/Select.js"
import {useState} from "react"


function ComparacaoExemplo(){
    const [ligasSelecionadas, setLigas] = useState([])
    const [paisSelecionadas, setPais] = useState([])
    const [posicaoSelecionadas, setPosicao] = useState([])
    const [idadeMinSelecionada, setIdadeMin] = useState(0)
    const [idadeMaxSelecionada, setIdadeMax] = useState(2000)
    const [selectedMax, setSelectedMax] = useState("")
    const [selectedMin, setSelectedMin] = useState("")

    const idades = [16,18,21,24,27,30,32,35]

    const ligasFilterAdd = (liga) => {setLigas([...ligasSelecionadas, liga])}

    const ligasFilterRemove = (liga) => {setLigas(ligasSelecionadas.filter(element => element !== liga))}

    const paisFilterAdd = (pais) => {setPais([...paisSelecionadas, pais])}

    const paisFilterRemove = (pais) => {setPais(paisSelecionadas.filter(element => element !== pais))}

    const posicaoFilterAdd = (posicao) => {setPosicao([...posicaoSelecionadas, posicao])}

    const posicaoFilterRemove = (posicao) => {setPosicao(posicaoSelecionadas.filter(element => element !== posicao))}

    const idadeMinAdd = (choice) => {
        if(choice.target.value !== "-"){
            setIdadeMin(choice.target.value)
            setSelectedMin(choice.target.value)
            console.log(choice.target.value)
        } else{
            setIdadeMin(0)
        }
            
    }

    const idadeMaxAdd = (choice) => {
        if(choice.target.value !== "-"){
            setIdadeMax(choice.target.value)
            setSelectedMax(choice.target.value)
            console.log(choice.target.value)
        } else{
            setIdadeMax(2000)
        }
    }

    const applyFilter = () => {
        console.log({
            "ligas": ligasSelecionadas,
            "pais": paisSelecionadas,
            "posicao": posicaoSelecionadas,
            "idadeMin": idadeMinSelecionada,
            "idadeMax": idadeMaxSelecionada 
        })
    }

    const eraseFilters = () => {
        setLigas([])
        setIdadeMax(2000)
        setIdadeMin(0)
        setPais([])
        setPosicao([])
        setSelectedMax("")
        setSelectedMin("")
    }

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
                        <Select name = "Liga" placeholder="Selecione uma Liga" callbackAdd = {ligasFilterAdd} callbackRemove = {ligasFilterRemove} filters={ligasSelecionadas} options={["Liga a", "Liga b", "Liga c", "Liga d", "Liga e", "Liga f", "Liga g", "Liga h", "Liga i", "Liga j", "Liga k", "Liga l", "Liga m", "Liga n", "Liga o", "Liga p", "Liga q", "Liga r",]}/>
                        <Select name = "País" placeholder="Selecione um País"  callbackAdd = {paisFilterAdd} callbackRemove = {paisFilterRemove}  filters={paisSelecionadas}  options={["França", "Brasil", "Italia", "Espanha"]}/>
                        <Select name = "Posição" placeholder="Selecione uma Posição" callbackAdd = {posicaoFilterAdd} callbackRemove = {posicaoFilterRemove}  filters={posicaoSelecionadas}  options={["Zagueiro", "Volante","Atacante"]}/>
                        <div className='age-group'>
                            <div className='select-age'>
                                <h5>Idade Min.</h5>
                                <select value = {selectedMin}  onChange = {idadeMinAdd}>
                                    <option>-</option>
                                    {idades.filter(idade => idade < idadeMaxSelecionada).map(idade => <option>{idade}</option>)}
                                        
                                </select>
                            </div>
                            
                            <div className='select-age'>
                                <h5>Idade Max.</h5>
                                <select value = {selectedMax} onChange = {idadeMaxAdd} >
                                     <option>-</option>
                                    {idades.filter(idade => idade > idadeMinSelecionada).map(idade => <option >{idade}</option>)}
                                </select>
                            </div>
                        </div>
                    </section>
                    <div className='button-group'>
                        <button onClick={applyFilter} className='button-confirm'>Confirmar</button>
                        <button onClick={eraseFilters} className='button-erase'>Limpar</button>
                    </div>
                    
                </section>
            

                <div className='espaco'>&nbsp;</div>
            </div>
            <div className="side"></div>
        </div>
    )
}

export default ComparacaoExemplo