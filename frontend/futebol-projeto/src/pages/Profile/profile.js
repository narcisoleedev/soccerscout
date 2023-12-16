import "./profile.css"

import avatar from "../../imagens/avatar.png"

import {useState} from "react"
import PassInput from "../../components/PassInput/passinput"

const Profile = () => {

    const [oldPass, setOldPass] = useState("")

    const [newPass, setNewPass] = useState("")

    const [confPass, setConfPass] = useState("")

    const [erroConfPass, setErroConfPass] = useState(false)

    const handleChange = (e) => {
        switch(e.target.id){
            case "oldPass":
                setOldPass(e.target.value)
                break
            case "newPass":
                setNewPass(e.target.value)
                break
            case "confPass":
                setConfPass(e.target.value)
                break
        }
       
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(newPass !== confPass){
            setErroConfPass(true)
            return
        } else{
            setErroConfPass(false)
        }
           
        const json = {
            "password" : newPass
        }
        console.log(json)
    }

    return(
        <div className='Main'>
            <div className="side"></div>
            <div className='conteudo'>
                <h1> Perfil </h1>
                <div className="profile">
                    <div className="infos-profile">
                        <img className ="icon-profile" src={avatar} />
                        <h2>Nome</h2>
                        <h3>Email</h3>
                        <span> <b>Plano: </b> Ômega</span>
                    </div>
                    <div className="form-profile">
                        <h2>Trocar senha</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="input-groups">
                                <label>Senha Antiga:</label>
                                <PassInput autocomplete= {"current-password"} handleChange = {handleChange} value = {oldPass} id={"oldPass"}/>
                                
                            </div>
                            <div className="input-groups">
                                <label>Nova Senha:</label>
                                <PassInput autocomplete= {"new-password"} handleChange = {handleChange} value = {newPass} id={"newPass"}/>
                            </div>

                            <div className="input-groups">
                                <label >Confirmar Senha:</label>
                                <PassInput handleChange = {handleChange} value = {confPass} id={"confPass"}/>
                            </div>
                            
                            {erroConfPass &&
                                <h4 className='error_password'>Nova senha não coincidem com confirmar</h4>}

                            <button type="submit">Alterar senha</button>
                        </form>
                    </div>
                </div>
               

                <div className='buraco'>&nbsp;</div>
            </div>
            <div className="side"></div>
        </div>
    )
}

export default Profile