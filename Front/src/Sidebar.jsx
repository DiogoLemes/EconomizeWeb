export default function Sidebar() {
    return (
        <div className="lato-regular text-lg bg-[#F1F2F7] h-[92vh] mb-0 flex flex-col gap-12">
            <img src="src\assets\logo.svg" alt="logo economize" className="w-[50%] h-[10%] mx-auto"></img>
            <span className="text-sidebar-text lato-bold">MENU</span>
            <ul className="">
                <li className="hover:bg-sidebar-button rounded-md mx-4 mb-2 h-12 ">
                    
                    <button className="w-[100%] p-2 text-sidebar-text flex justify-start items-center gap-1">
                        <img src="\src\assets\DashboardON.svg" className="w-[20px] h-[20px] ml-6"></img>
                        <span>Dashboard</span>
                    </button>
                </li>
                <li className="hover:bg-sidebar-button rounded-md mx-4 mb-2 h-12 ">
                    <button className="w-[100%] p-2 text-sidebar-text flex justify-start items-center gap-1">
                        <img src="\src\assets\TransaçõesON.svg" className="w-[20px] h-[20px] ml-6"></img>
                        <span>Transações</span>
                    </button>
                </li>
                <li className="hover:bg-sidebar-button rounded-md mx-4 mb-2 h-12 ">
                    <button className="w-[100%] p-2 text-sidebar-text flex justify-start items-center gap-1">
                        <img src="\src\assets\InvestimentosON.svg" className="w-[20px] h-[20px] ml-6"></img>
                        <span>Investimentos</span>
                    </button>
                </li>
                <li className="hover:bg-sidebar-button rounded-md mx-4 mb-2 h-12 ">
                    <button className="w-[100%] p-2 text-sidebar-text flex justify-start items-center gap-1">
                        <img src="\src\assets\CartãoON.svg" className="w-[20px] h-[20px] ml-6"></img>
                        <span>Meus Cartões</span>
                    </button>
                </li>
                <li className="hover:bg-sidebar-button rounded-md mx-4 mb-2 h-12 ">
                    <button className="w-[100%] p-2 text-sidebar-text flex justify-start items-center gap-1">
                        <img src="\src\assets\PerfilON.svg" className="w-[20px] h-[20px] ml-6"></img>
                        <span>Perfil</span>
                    </button>
                </li>
                <li className="hover:bg-sidebar-button rounded-md mx-4 mb-2 h-12 ">
                    <button className="w-[100%] p-2 text-sidebar-text flex justify-start items-center gap-1">
                        <img src="\src\assets\ConfigON.svg" className="w-[20px] h-[20px] ml-6"></img>
                        <span>Configurações</span>
                        </button>
                </li>
            </ul>
            <button className="rounded-full bg-sidebar-selected-text w-28 h-28 mt-[30%] self-center relative">
                <div className="absolute top-1/2 left-1/2 h-1/2 w-[6%] bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute top-1/2 left-1/2 h-[6%] w-1/2 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            </button>
        </div>
    )
}