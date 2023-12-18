import "./Filters.css"
import Select from "../Select/Select.js"
import {useState} from "react"
import info from '../../info.js'

const Filters = (props) => {
    const {liga} = info
    const {league} = info
    const {posicao} = info
    const {pais} = info
    const {idades} = info
    const [ligasSelecionadas, setLigas] = useState([])
    const [paisSelecionadas, setPais] = useState([])
    const [posicaoSelecionadas, setPosicao] = useState([])
    const [idadeMinSelecionada, setIdadeMin] = useState(0)
    const [idadeMaxSelecionada, setIdadeMax] = useState(2000)
    const [selectedMax, setSelectedMax] = useState("")
    const [selectedMin, setSelectedMin] = useState("")

    // const idades = [16,18,21,24,27,30,32,35]

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
        } else{
            setIdadeMin(0)
        }
            
    }

    const idadeMaxAdd = (choice) => {
        if(choice.target.value !== "-"){
            setIdadeMax(choice.target.value)
            setSelectedMax(choice.target.value)
        } else{
            setIdadeMax(2000)
        }
    }

    const applyFilter = () => {
        props.applyFilter({
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
        if(!props.isExample)
            props.eraseTable()
    }
    return(
        <div>
            <section className="coletiva_selects">
                <Select name = "Liga" placeholder="Selecione uma Liga" callbackAdd = {ligasFilterAdd} callbackRemove = {ligasFilterRemove} filters={ligasSelecionadas} options={league}/>
                <Select name = "País" placeholder="Selecione um País"  callbackAdd = {paisFilterAdd} callbackRemove = {paisFilterRemove}  filters={paisSelecionadas}  options={pais}/>
                <Select name = "Posição" placeholder="Selecione uma Posição" callbackAdd = {posicaoFilterAdd} callbackRemove = {posicaoFilterRemove}  filters={posicaoSelecionadas}  options={posicao}/>
                <div className='age-group'>
                    <div className='select-age'>
                        <h5>Idade Min.</h5>
                        <select value = {selectedMin}  onChange = {idadeMinAdd}>
                            <option>-</option>
                            {idades.filter(idade => idade < idadeMaxSelecionada).map(idade => <option key={idade}>{idade}</option>)}
                                
                        </select>
                    </div>
                    
                    <div className='select-age'>
                        <h5>Idade Max.</h5>
                        <select value = {selectedMax} onChange = {idadeMaxAdd} >
                                <option>-</option>
                            {idades.filter(idade => idade > idadeMinSelecionada).map(idade => <option key={idade}>{idade}</option>)}
                        </select>
                    </div>
                </div>
            </section>
            <div className='button-group'>
                <button onClick={applyFilter} className='button-confirm'>Confirmar</button>
                <button onClick={eraseFilters} className='button-erase'>Limpar</button>
            </div>
        </div>
       
    )
}

export default Filters