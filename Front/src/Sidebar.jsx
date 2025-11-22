import { useState } from 'react';
import PopupMenu from './PopupMenu';
import {SidebarData} from './SidebarData'
import { NavLink, useLocation } from 'react-router'

export default function Sidebar() {

    const [showPopup, setShowPopup] = useState(false)
    const location = useLocation()
    const unselectedClass = "hover:bg-sidebar-button rounded-md p-2 mx-4 h-12 text-sidebar-text text-start target:text-sidebar-selected-text target:bg-sidebar-button hover:cursor-pointer"
    const selectedClass = "rounded-md p-2 mx-4 h-12 text-sidebar-selected-text text-start hover:cursor-pointer bg-sidebar-button"

    function PageIsEqual(item) {
        if (location.pathname === item.path) { //arrumar essa parte pra deixar destacado somente o botão da pagina especifica (e a imagem)
            return true
        }
        else return false
    }

    return (
        <div className="lato-regular text-lg bg-[#F1F2F7] h-[92vh] mb-0 flex flex-col gap-12">
            <img src="src\assets\logo.svg" alt="logo economize" className="w-[50%] h-[10%] mx-auto"></img>
            <span className="text-sidebar-text lato-bold">MENU</span>
            <ul className="">
                {SidebarData.map((item) => {
                    return (
                        <NavLink to={item.path}>
                            <li key={item.id} className={unselectedClass}>
                                <div className="flex flex-row gap-2">
                                    {item.imgOff}
                                    {item.title}
                                </div>
                            </li>
                        </NavLink>
                    );
                })}
                
            </ul>
            <div >
                <button onClick={() => setShowPopup(true)} className="rounded-full bg-sidebar-selected-text w-28 h-28 mt-[30%] self-center relative hover:cursor-pointer">
                    <div className="absolute top-1/2 left-1/2 h-1/2 w-[6%] bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute top-1/2 left-1/2 h-[6%] w-1/2 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                </button>
               {showPopup && <PopupMenu onClose={() => setShowPopup(false)}/>}
            </div>
        </div>
    )
}