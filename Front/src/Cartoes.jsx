import Footer from "./Components/Footer"
import Sidebar from "./Components/Sidebar"
import Header from "./Components/Header"
import { useContext } from "react"
import { AuthContext } from "./UserContext"
import {ThemeSetter} from "./Functions/ThemeSetter"
import {PageUnload} from "./Functions/PageUnload"
import {HomeRedirect} from "./Functions/HomeRedirect"

export default function Cartoes() {

    HomeRedirect()
    PageUnload()
    ThemeSetter()
    
    const {user, setUser, id, setId, email, setEmail, userPfp, setUserPfp} = useContext(AuthContext)

    const loggedInUsername = sessionStorage.getItem("loggedUsername")
    setUser(loggedInUsername)

    return(
        <div className="flex flex-col">
                    <div className="flex flex-row h-[90vh]">
                        <div className="w-[15%]">
                            <Sidebar selected="cartoes"/>
                        </div>
                        <div className="w-[85%] bg-theme-bg">
                            <div className="font-lato-bold flex flex-col text-text-theme">
                                <Header text={"Cartões"}/>
                                <div className="bg-cartoes-bg rounded-2xl h-[60vh] w-[50vw] self-center mt-10 text-black">
                                    <div className="flex flex-row font-lato-bold text-2xl p-8 justify-between">
                                        <span>Nome</span>
                                        <span>Número</span>
                                        <span>Tipo</span>
                                        <span></span>
                                    </div>
                                </div>
                                <div className="self-center flex flex-row gap-2 w-[50vw] mt-2">
                                    <img src="src/assets/icone informação.svg"/>
                                    <p className="font-lato-regular self-center">Não é necessário cadastrar seu cartão para usar nosso site.<br/>Essa funcionalidade insere receitas e despesas automaticamente para facilitar seu gerenciamento.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
    )
}