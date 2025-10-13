import Footer from "./Footer"
import Sidebar from "./Sidebar"
import { useContext } from "react"
import { AuthContext } from "./UserContext"

export default function Cartoes() {

    const {user, setUser, id, setId, email, setEmail} = useContext(AuthContext)

    const loggedInUsername = sessionStorage.getItem("loggedUsername")
    setUser(loggedInUsername)

    return(
        <div className="flex flex-wrap">
                    <div className="flex-[0_0_15%]">
                        <Sidebar selected="cartoes"/>
                    </div>
                    <div className="flex-[0_0_85%]">
                        <div className="lato-bold flex flex-col text-black">
                            <div className="flex flex-row p-2">
                                <span className="text-4xl mx-auto">Cartões</span>
                                <span className="lato-regular mr-16 text-end">{user}</span>
                            </div>
                            <div className="bg-[#D9D9D9] rounded-2xl h-[60vh] w-[50vw] self-center mt-10">
                                <div className="flex flex-row font-lato text-2xl p-8 justify-between">
                                    <span>Nome</span>
                                    <span>Número</span>
                                    <span>Tipo</span>
                                    <span></span>
                                </div>
                            </div>
                            <div className="self-center flex flex-row gap-2 w-[50vw] mt-2">
                                <img src="src/assets/icone informação.svg"/>
                                <p className="self-center">Não é necessário cadastrar seu cartão para usar nosso site.<br/>Essa funcionalidade insere receitas e despesas automaticamente para facilitar seu gerenciamento.</p>
                            </div>
                            
                        </div>
                    </div>
                    <Footer/>
                </div>
    )
}