import Footer from "./Components/Footer"
import Sidebar from "./Components/Sidebar"
import Header from "./Components/Header"
import { useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { AuthContext } from "./UserContext"
import {ThemeSetter} from "./Functions/ThemeSetter"
import {HomeRedirect} from "./Functions/HomeRedirect"

export default function Perfil() {

    HomeRedirect()
    ThemeSetter()

    const {user, setUser, id, setId, email, setEmail, userPfp, setUserPfp} = useContext(AuthContext)
    
    const [pfpAtual, setPfpAtual] = useState("src/assets/Foto de Perfil Padrão.svg")
    const [toggleDeletar, setToggleDeletar] = useState(false)
    
    const loggedInUsername = sessionStorage.getItem("loggedUsername")
    const userEmail = sessionStorage.getItem("userEmail")
    setUser(loggedInUsername)
    setEmail(userEmail)
    
    let userNameDisplay
    if(loggedInUsername == null || loggedInUsername == undefined) {
        userNameDisplay = ""
    }
    else userNameDisplay = loggedInUsername

    const [primeiroNome, setPrimeiroNome] = useState(userNameDisplay.split(" ")[0])
    const [segundoNome, setSegundoNome] = useState(userNameDisplay.split(" ")[1])
    const [emailAtual, setEmailAtual] = useState(userEmail)
    const [emailNovo, setEmailNovo] = useState('')
        
    const inactiveButtonClass = "font-lato-bold text-text-theme bg-button-profile-inactive hover:bg-button-active hover:text-text-theme hover:opacity-100 hover:cursor-pointer border-2 border-b-gray-outline border-t-0 border-r-0 border-l-0 w-[50%] h-12"
    const activeButtonClass = "font-lato-bold text-text-theme bg-button-active hover:cursor-pointer border-2 border-b-logo-primary border-t-0 border-r-0 border-l-0 w-[50%] h-12"
    const inputFieldClass = "outline-2 outline-input-border rounded text-black p-1 font-lato-bold bg-white"
    const inputButtonClass = "col-start-2 font-lato-bold bg-logo-primary rounded-md w-30 h-10 text-white justify-center hover:cursor-pointer p-1"

    const navigate = useNavigate() // Hook do React Router
    const navConfig = () => {
        navigate('/configuracoes') // Redireciona para pagina de config
    }

    function AlterarDadosUsuario(){
        // setEmail(emailNovo)
        // const nomeInteiro = primeiroNome + " " + segundoNome
        // setUser(nomeInteiro)
        // console.log(email)
        // console.log(user)
        console.log(primeiroNome)
        console.log(segundoNome)
        console.log(emailAtual)
        console.log(emailNovo)
    }

    return(
        <div className="flex flex-col">
            <div className="flex flex-row h-[90vh]">
                <div className="w-[15%]">
                    <Sidebar selected="perfil"/>
                </div>
                <div className="w-[85%] bg-theme-bg">
                    <div className="flex flex-col text-text-theme">
                        <Header text={"Perfil"}/>
                        <div className="bg-perfil-bg h-[70vh] w-[50vw] self-center drop-shadow-md mt-10 text-text-theme">
                            <button id="profileButton" className={activeButtonClass}>Perfil</button>
                            <button id="settingsButton" onClick={navConfig} className={inactiveButtonClass}>Configurações</button>
                            <form className="mx-auto px-[5%] h-[80%]">
                                <div className="flex flex-col py-2 justify-evenly h-[100%]">
                                    <div className="h-[33%]">
                                        <span className="font-lato-bold text-md text-start py-2">Informações Básicas:</span>
                                        <div className="gap-4 grid grid-cols-2 px-[5%] my-4">
                                            <input type="text" id="nome" readOnly={true} value={primeiroNome} className={inputFieldClass}></input>
                                            <input type="text" id="sobrenome" readOnly={true} value={segundoNome} className={inputFieldClass}></input>
                                            <input type="text" id="emailAtual" readOnly={true} value={emailAtual} className={inputFieldClass}></input>
                                            <input type="text" id="emailNovo" readOnly={true} placeholder="Novo Email" value={emailNovo} className={inputFieldClass}></input>
                                            <input type="button" value="Alterar dados" onClick={()=> AlterarDadosUsuario()} className={inputButtonClass}/>
                                        </div>
                                    </div>
                                    <div className="flex flex-row">
                                        <div className="flex flex-col w-1/4 gap-2">
                                            <span className="font-lato-bold text-md text-start py-2">Foto de Perfil:</span>
                                            {pfpAtual && (<img src={userPfp} id="userPfp" className="w-25 h-25 ml-10 self-center rounded-[50%]"/>)}
                                            <label htmlFor="pfpPicker" onChange={(e) => {
                                                const file = e.target.files?.[0]
                                                setPfpAtual(
                                                    file ? URL.createObjectURL(file) : undefined
                                                )
                                                setUserPfp(URL.createObjectURL(file))
                                            }} 
                                                className="ml-10 text-center self-center font-lato-bold bg-logo-primary rounded-md w-30 h-10 text-white justify-center hover:cursor-pointer p-1">
                                                <span className="text-center ">Alterar foto</span> {/*ver de alinhar o texto no botão */}
                                                <input type="file" id="pfpPicker" accept="image/*" className="opacity-0 absolute w-0 h-0 z-[-1]"></input>
                                            </label>
                                        </div>
                                            {toggleDeletar ? (
                                                <div className="flex flex-col w-1/2 ml-[25%] justify-end gap-2">
                                                    <span className="font-lato-bold text-md text-start py-2">Você tem certeza?</span>
                                                    <div className="flex flex-row gap-4">
                                                        <input type="button" value="Sim" onClick={()=> console.log("conta deletada")} className="font-lato-bold bg-logo-primary rounded-md w-30 h-10 text-white justify-center hover:cursor-pointer p-1"></input>
                                                        <input type="button" value="Não" onClick={() => setToggleDeletar(false)} className="font-lato-bold bg-black rounded-md w-30 h-10 text-white justify-center hover:cursor-pointer p-1"></input>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col w-1/2 ml-[25%] justify-end gap-2">
                                                    <span className="font-lato-bold text-md text-start py-2">Quero apagar minha conta:</span>
                                                    <input type="button" value="Apagar Conta" onClick={() => setToggleDeletar(true)} className="font-lato-bold bg-delete-button rounded-md w-30 h-10 text-white justify-center hover:cursor-pointer p-1"></input>
                                                </div>
                                            )}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}