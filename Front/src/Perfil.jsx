import { useNavigate } from "react-router-dom";
import Footer from "./Footer"
import Sidebar from "./Sidebar"
import { useContext } from "react";
import { AuthContext } from "./UserContext";

export default function Perfil() {

    const {user, setUser, id, setId, email, setEmail} = useContext(AuthContext)

    const loggedInUsername = sessionStorage.getItem("loggedUsername")
    setUser(loggedInUsername)
    
    const inactiveButtonClass = "font-lato border-2 text-gray-700 bg-[#F7F7F7] hover:bg-[#E3E3FF] hover:text-black hover:opacity-100 hover:cursor-pointer border-b-[#636364] border-t-0 border-r-0 border-l-0 w-[50%] h-12"
    const activeButtonClass = "font-lato border-2 text-black bg-[#E3E3FF] hover:cursor-pointer border-b-logo-primary border-t-0 border-r-0 border-l-0 w-[50%] h-12"
    const formInputClass = ""
    
    const nomeTeste = "nome sobrenome"
    const emailTeste = "email@email.com"
    const senhaTeste = "1234567890"

    function ConsoleLogTeste() {
        const nomeSplit = nomeTeste.split(" ")
        if(nomeSplit.length() >= 2){
            nomeSplit[0]
        }
    }


    const navigate = useNavigate() // Hook do React Router
    const navConfig = () => {
        navigate('/configuracoes') // Redireciona para pagina de config
    }

    const navProfile = () => {
        navigate('/perfil') // Redireciona para pagina de perfil (ja esta na pagina, deixei por enquanto)
    }

    
    return(
        <div className="flex flex-wrap">
            <div className="flex-[0_0_15%]">
                <Sidebar selected="perfil"/>
            </div>
            <div className="flex-[0_0_85%]">
                <div className="flex flex-col text-black">
                    <div className="flex flex-row p-2">
                        <span className="text-4xl mx-auto"> Perfil</span>
                        <span className="mr-16 text-end">{user}</span>
                    </div>
                    <div className="bg-[#FBFBFE] h-[70vh] w-[50vw] self-center drop-shadow-2xl mt-10">
                        <button id="profileButton" onClick={navProfile} className={activeButtonClass}>Perfil</button>
                        <button id="settingsButton" onClick={navConfig} className={inactiveButtonClass}>Configurações</button>
                        <form className="mx-auto px-[5%] h-[80%]">
                            <div className="flex flex-col py-2 justify-evenly h-[100%]">
                                <div className="h-[33%]">
                                    <span className="font-lato text-md text-start py-2">Informações Básicas:</span>
                                    <div className="gap-4 flex flex-wrap px-[5%] my-4">
                                        <input type="text" id="nome" value="" className="outline-2 outline-[#B3B3B3] rounded text-black opacity-75 w-[45%] h-[10%] p-1 font-lato"></input>
                                        <input type="text" id="sobrenome" value="" className="outline-2 outline-[#B3B3B3] rounded text-black opacity-75 w-[45%] h-[10%] p-1 font-lato"></input>
                                        <input type="text" id="emailAtual" value="" className="outline-2 outline-[#B3B3B3] rounded text-black opacity-75 w-[45%] h-[10%] p-1 font-lato"></input>
                                        <input type="text" id="emailNovo" value="" className="outline-2 outline-[#B3B3B3] rounded text-black opacity-75 w-[45%] h-[10%] p-1 font-lato"></input>
                                    </div>
                                    <input type="button" value="Alterar dados" className="font-lato bg-logo-primary rounded-md w-30 h-10 text-white justify-center hover:cursor-pointer p-1"/>{/*input ou botao? */}
                                </div>
                                <div>
                                    <span className="font-lato text-md text-start py-2">Segurança:</span>
                                    <div className="gap-4 flex flex-wrap px-[5%] my-4">
                                        <input type="text" id="senhaAtual" value="" className="outline-2 outline-[#B3B3B3] rounded text-black opacity-75 w-[45%] h-[10%] p-1 font-lato"></input>
                                        <input type="text" id="senhaNova" value="" className="outline-2 outline-[#B3B3B3] rounded text-black opacity-75 w-[45%] h-[10%] p-1 font-lato"></input>
                                    </div>
                                    <input type="button" value="Alterar Senha" className="font-lato bg-logo-primary rounded-md w-30 h-10 text-white justify-center hover:cursor-pointer p-1"/>{/*input ou botao? */}
                                </div>
                                <div></div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}