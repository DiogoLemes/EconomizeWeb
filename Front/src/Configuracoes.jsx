import { useNavigate } from "react-router-dom";
import Footer from "./Footer"
import Sidebar from "./Sidebar"

export default function Configuracoes() {
    
    const navigate = useNavigate() // Hook do React Router

    const navConfig = () => {
        navigate('/configuracoes') // Redireciona para pagina de config  (ja esta na pagina, deixei por enquanto)
    }

    const navProfile = () => {
        navigate('/perfil') // Redireciona para pagina de perfil
    }

    const inactiveButtonClass = "lato-bold text-gray-700 opacity-75 hover:bg-[#E3E3FF] hover:text-black hover:opacity-100 hover:cursor-pointer w-[50%] h-12"
    const activeButtonClass = "lato-bold border-3 text-black bg-[#E3E3FF] hover:cursor-pointer border-b-logo-primary border-t-0 border-r-0 border-l-0 w-[50%] h-12"
    
    return(
        <div>
            <div className="flex flex-wrap">
                <div className="flex-[0_0_15%]">
                    <Sidebar selected="configuracoes"/>
                </div>
                <div className="flex-[0_0_85%]">
                    <div className="lato-bold flex flex-col text-black">
                        <div className="flex flex-row p-2">
                            <span className="text-4xl mx-auto"> Config</span>
                            <span className="lato-regular mr-16 text-end">Nome usuário</span>
                        </div>
                        <div className="border-black border-2 h-[50vh] w-[50vw] self-center mb-10">
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