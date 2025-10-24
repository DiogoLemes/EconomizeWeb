import { useNavigate } from "react-router-dom";
import Footer from "./Footer"
import Sidebar from "./Sidebar"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "./UserContext"

export default function Configuracoes() {

    const {user, setUser, id, setId, email, setEmail, userPfp, setUserPfp} = useContext(AuthContext)
    
    const loggedInUsername = sessionStorage.getItem("loggedUsername")
    setUser(loggedInUsername)
    
    const temaAtual = localStorage.getItem("theme")
    const [theme, setTheme] = useState(temaAtual)
    // function changeTheme(){                                          //botão reseta na troca de pág mas o tema mantém
    //     setTheme((prev) => (prev === "light" ? "dark" : "light"))
    //     if(theme === "dark") {
    //         localStorage.setItem("theme", "dark")
    //     }
    //     else {
    //         localStorage.setItem("theme", "light")
    //     }
    //     console.log(theme)
    // }   
    
    // useEffect(() => {
    //         const root = window.document.documentElement;
    //         root.classList.remove("light", "dark");
    //         root.classList.add(theme);
    //         localStorage.setItem("theme", theme);
    //     }, [theme]);
    


    const navigate = useNavigate() // Hook do React Router

    const navConfig = () => {
        navigate('/configuracoes') // Redireciona para pagina de config  (ja esta na pagina, deixei por enquanto)
    }

    const navProfile = () => {
        navigate('/perfil') // Redireciona para pagina de perfil
    }

    const inactiveButtonClass = "font-lato-bold border-2 text-gray-700 bg-button-profile-inactive hover:bg-button-active hover:text-black hover:opacity-100 hover:cursor-pointer border-b-gray-outline border-t-0 border-r-0 border-l-0 w-[50%] h-12"
    const activeButtonClass = "font-lato-bold border-2 text-black bg-button-active hover:cursor-pointer border-b-logo-primary border-t-0 border-r-0 border-l-0 w-[50%] h-12"
    
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
                            <div className="flex flex-row gap-2">
                                <img src={userPfp} className="w-8 h-8 rounded-[50%]"/>
                                <span className="font-lato-regular mr-16 text-end">{user}</span>
                            </div>
                        </div>
                        <div className="bg-perfil-bg h-[70vh] w-[50vw] self-center drop-shadow-md mt-10">
                            <button id="profileButton" onClick={navProfile} className={inactiveButtonClass}>Perfil</button>
                            <button id="settingsButton" onClick={navConfig} className={activeButtonClass}>Configurações</button>
                            <div className="flex flex-col gap-[10%] h-[45%] w-[50%] justify-between p-8 font-lato-regular">
                                <div className="flex flex-col">
                                    <span>Tema:</span>
                                    <div className="p-4 flex items-center gap-4">
                                        <span>Claro</span>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" onChange={()=> changeTheme()} className="sr-only peer"/>
                                            <div className="w-14 h-8 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-gray-700 transition-all duration-300"></div> {/* background do slider (cinza pra preto)*/}
                                            <div className="absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 peer-checked:translate-x-6"></div> {/* slider (bolinha q mexe)*/}
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
                <Footer/>
            </div>
        </div>
    )
}