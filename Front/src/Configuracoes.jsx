import { useNavigate } from "react-router-dom"
import Footer from "./Components/Footer"
import Sidebar from "./Components/Sidebar"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "./UserContext"
import Header from "./Components/Header"
import {ThemeSetter} from "./Functions/ThemeSetter"
import {PageUnload} from "./Functions/PageUnload"
import {HomeRedirect} from "./Functions/HomeRedirect"

export default function Configuracoes() {

    HomeRedirect()
    PageUnload()

    const {user, setUser, id, setId, email, setEmail, userPfp, setUserPfp} = useContext(AuthContext)
    
    const loggedInUsername = sessionStorage.getItem("loggedUsername")
    setUser(loggedInUsername)
    
    const [isDark, setIsDark] = useState(false);

    useEffect(()=> {
        if(ThemeSetter() == true) {
            setIsDark(true)
        } else setIsDark(false)
    }, [])

    const changeTheme = () => {
        const newTheme = isDark ? "light" : "dark"
        setIsDark(!isDark);
        localStorage.setItem("theme", newTheme)

        if (newTheme === "dark") {
            document.documentElement.classList.add("dark")
        }
         else {
            document.documentElement.classList.remove("dark")
        }
    };

    const navigate = useNavigate() // Hook do React Router

    const navConfig = () => {
        navigate('/configuracoes') // Redireciona para pagina de config  (ja esta na pagina, deixei por enquanto)
    }

    const navProfile = () => {
        navigate('/perfil') // Redireciona para pagina de perfil
    }

    const inactiveButtonClass = "font-lato-bold border-2 text-text-theme bg-button-profile-inactive hover:bg-button-active hover:text-text-theme hover:opacity-100 hover:cursor-pointer border-b-gray-outline border-t-0 border-r-0 border-l-0 w-[50%] h-12"
    const activeButtonClass = "font-lato-bold border-2 text-text-theme bg-button-active hover:cursor-pointer border-b-logo-primary border-t-0 border-r-0 border-l-0 w-[50%] h-12"
    
    return(
        <div>
            <div className="flex flex-col">
                <div className="flex flex-row h-[90vh]">
                    <div className="w-[15%]">
                        <Sidebar selected="configuracoes"/>
                    </div>
                    <div className="w-[85%] bg-theme-bg text-text-theme">
                        <div className="font-lato-bold flex flex-col">
                            <Header text={"Configurações"}/>
                            <div className="bg-perfil-bg h-[70vh] w-[50vw] self-center drop-shadow-md mt-10">
                                <button id="profileButton" onClick={navProfile} className={inactiveButtonClass}>Perfil</button>
                                <button id="settingsButton" onClick={navConfig} className={activeButtonClass}>Configurações</button>
                                <div className="flex flex-col gap-[10%] h-[45%] w-[50%] justify-between p-8 font-lato-regular">
                                    <div className="flex flex-col">
                                        <span>Tema:</span>
                                        <div className="p-4 flex items-center gap-4">
                                            <span>Claro</span>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                 <input
                                                    type="checkbox"
                                                    checked={isDark}
                                                    onChange={changeTheme}
                                                    className="sr-only peer"
                                                    />
                                                <div className="w-14 h-8 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-button-active transition-all duration-300"></div>
                                                <div className="absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 peer-checked:translate-x-6"></div>
                                            </label>
                                            <span>Escuro</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <span>Idioma:</span>
                                        <select className="p-4 w-[25%]">
                                            <option>Pt-Br</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col">
                                        <span>Fonte:</span>
                                        <select className="p-4 w-[25%]">
                                            <option>Lato</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        </div>
    )
}