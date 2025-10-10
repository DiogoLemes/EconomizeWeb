import { useState } from 'react';
import PopupMenu from './PopupMenu';
import { useNavigate } from 'react-router'

export default function Sidebar({selected}) {

    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false)
    
    const selectedTab = selected
    const unselectedClass = "hover:bg-sidebar-button rounded-md p-2 mx-4 h-12 text-sidebar-text text-start target:text-sidebar-selected-text target:bg-sidebar-button hover:cursor-pointer flex flex-row gap-2"
    const selectedClass = "rounded-md p-2 mx-4 h-12 text-sidebar-selected-text text-start hover:cursor-pointer bg-sidebar-button flex flex-row gap-2"

    function navigateSidebar(path) {
        const navigatePath = "/" + path    
        navigate(navigatePath)
    }

    return (
        <div className="lato-regular text-lg bg-[#F1F2F7] h-[92vh] mb-0 flex flex-col gap-12">
            <img src="src\assets\logo.svg" alt="logo economize" className="w-[50%] h-[10%] mx-auto"></img>
            <span className="text-sidebar-text text-center font-lato">MENU</span>
            <ul className="">
                <li onClick={() => navigateSidebar("dashboard")} className={selectedTab == "dashboard" ? selectedClass : unselectedClass}>
                    <img src={selectedTab == "dashboard" ? "/src/assets/DashboardON.svg" : "/src/assets/DashboardOFF.svg"}className="w-6 h-6"/>
                    <span>Dashboard</span>
                </li>
                <li onClick={() => navigateSidebar("transacoes")} className={selectedTab == "transacoes" ? selectedClass : unselectedClass}>
                    <img src={selectedTab == "transacoes" ? "/src/assets/TransaçõesON.svg" : "/src/assets/TransaçõesOFF.svg"} className="w-6 h-6"/>
                    <span>Transações</span>
                </li>
                <li onClick={() => navigateSidebar("investimentos")} className={selectedTab == "investimentos" ? selectedClass : unselectedClass}>
                    <img src={selectedTab == "investimentos" ? "/src/assets/InvestimentosON.svg" : "/src/assets/InvestimentosOFF.svg"} className="w-6 h-6"/>
                    <span>Investimentos</span>
                </li>
                <li onClick={() => navigateSidebar("cartoes")} className={selectedTab == "cartoes" ? selectedClass : unselectedClass}>
                    <img src={selectedTab == "cartoes" ? "/src/assets/CartãoON.svg" : "/src/assets/CartãoOFF.svg"} className="w-6 h-6"/>
                    <span>Meus Cartões</span>
                </li>
                <li onClick={() => navigateSidebar("perfil")} className={selectedTab == "perfil" ? selectedClass : unselectedClass}>
                    <img src={selectedTab == "perfil" ? "/src/assets/PerfilON.svg" : "/src/assets/PerfilOFF.svg"} className="w-6 h-6"/>
                    <span>Perfil</span>
                </li>
                <li onClick={() => navigateSidebar("configuracoes")} className={selectedTab == "configuracoes" ? selectedClass : unselectedClass}>
                    <img src={selectedTab == "configuracoes" ? "/src/assets/ConfigON.svg" : "/src/assets/ConfigOFF.svg"} className="w-6 h-6"/>
                    <span>Configurações</span>
                </li>
            </ul>
            <div className="mx-auto mt-[30%]">
                <button onClick={() => setShowPopup(true)} className="rounded-full bg-sidebar-selected-text w-28 h-28 self-center relative hover:cursor-pointer">
                    <div className="absolute top-1/2 left-1/2 h-1/2 w-[6%] bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute top-1/2 left-1/2 h-[6%] w-1/2 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                </button>
               {showPopup && <PopupMenu onClose={() => setShowPopup(false)}/>}
            </div>
        </div>
    )
}