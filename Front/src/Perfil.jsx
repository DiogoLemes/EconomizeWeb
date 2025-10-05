import { useNavigate } from "react-router-dom";
import Footer from "./Footer"
import Sidebar from "./Sidebar"

export default function Perfil() {
    
    const navigate = useNavigate() // Hook do React Router

    const navConfig = () => {
        navigate('/configuracoes') // Redireciona para pagina de config
    }

    const navProfile = () => {
        navigate('/perfil') // Redireciona para pagina de perfil (ja esta na pagina, deixei por enquanto)
    }

    const inactiveButtonClass = "lato-bold text-gray-700 opacity-75 hover:bg-[#E3E3FF] hover:text-black hover:opacity-100 hover:cursor-pointer w-[50%] h-12"
    const activeButtonClass = "lato-bold border-2 text-black bg-[#E3E3FF] hover:cursor-pointer border-b-logo-primary border-t-0 border-r-0 border-l-0 w-[50%] h-12"
    
    
    return(
        <div className="flex flex-wrap">
            <div className="flex-[0_0_15%]">
                <Sidebar/>
            </div>
            <div className="flex-[0_0_85%]">
                <div className="lato-bold flex flex-col text-black">
                    <div className="flex flex-row p-2">
                        <span className="text-4xl mx-auto"> Perfil</span>
                        <span className="lato-regular mr-16 text-end">Nome usuário</span>
                    </div>
                    <div className="border-[#b7b7ff] border-2 rounded-[2%] h-[50vh] w-[50vw] self-center mb-10 drop-shadow-xl">
                        <button id="profileButton" onClick={navProfile} className={activeButtonClass}>Perfil</button>
                        <button id="settingsButton" onClick={navConfig} className={inactiveButtonClass}>Configurações</button>
                        {/* (form de perfil) */}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}