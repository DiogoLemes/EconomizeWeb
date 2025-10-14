import { useNavigate } from "react-router-dom";
import Footer from "./Footer"
import Sidebar from "./Sidebar"
import { useContext } from "react"
import { AuthContext } from "./UserContext"

export default function Configuracoes() {

    const {user, setUser, id, setId, email, setEmail} = useContext(AuthContext)

    const loggedInUsername = sessionStorage.getItem("loggedUsername")
    setUser(loggedInUsername)
    
    const navigate = useNavigate() // Hook do React Router

    const navConfig = () => {
        navigate('/configuracoes') // Redireciona para pagina de config  (ja esta na pagina, deixei por enquanto)
    }

    const navProfile = () => {
        navigate('/perfil') // Redireciona para pagina de perfil
    }

    const inactiveButtonClass = "font-lato-bold border-2 text-gray-700 bg-[#F7F7F7] hover:bg-[#E3E3FF] hover:text-black hover:opacity-100 hover:cursor-pointer border-b-[#636364] border-t-0 border-r-0 border-l-0 w-[50%] h-12"
    const activeButtonClass = "font-lato-bold border-2 text-black bg-[#E3E3FF] hover:cursor-pointer border-b-logo-primary border-t-0 border-r-0 border-l-0 w-[50%] h-12"
    
    return(
        <div>
            <div className="flex flex-wrap">
                <div className="flex-[0_0_15%]">
                    <Sidebar selected="configuracoes"/>
                </div>
                <div className="flex-[0_0_85%]">
                    <div className="font-lato-bold flex flex-col text-black">
                        <div className="flex flex-row p-2">
                            <span className="text-4xl mx-auto"> Configurações</span>
                            <span className="font-lato-regular mr-16 text-end">{user}</span>
                        </div>
                        <div className="bg-[#FBFBFE] h-[70vh] w-[50vw] self-center drop-shadow-md mt-10">
                            <button id="profileButton" onClick={navProfile} className={inactiveButtonClass}>Perfil</button>
                            <button id="settingsButton" onClick={navConfig} className={activeButtonClass}>Configurações</button>
                            {/* (form de perfil) */}
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        </div>
    )
}