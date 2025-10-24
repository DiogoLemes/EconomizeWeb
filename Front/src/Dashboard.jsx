import Footer from "./Footer"
import Sidebar from "./Sidebar"
import { useLocation } from "react-router-dom"
import { useContext } from "react"
import {AuthContext} from "./UserContext"

export default function Dashboard() {

    const {user, setUser, id, setId, email, setEmail, userPfp, setUserPfp} = useContext(AuthContext)

    const loggedInUsername = sessionStorage.getItem("loggedUsername")
    setUser(loggedInUsername)

    const classeCards = "bg-white-div rounded-2xl border-theme-light border-1 shadow-md h-[6em] w-[20em] flex flex-row"

    let saldo1 = 1000
    let saldo2 = 12345
    let saldo3 = 4
    let saldo4 = 23480000

    saldo1 = saldo1.toLocaleString("pt-BR", {style: "currency", currency: "BRL"}) //tolocalestring ou intl.number ver dps
    saldo2 = saldo2.toLocaleString("pt-BR", {style: "currency", currency: "BRL"}) //esses numeros tem q pegar do banco dps msm
    saldo3 = saldo3.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})
    saldo4 = saldo4.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})

    return(
        <div className="flex flex-wrap">
            <div className="flex-[0_0_15%]">
                <Sidebar selected="dashboard"/>
            </div>
            <div className="font-lato-bold flex flex-col text-black flex-[0_0_85%]">
                <div className="flex flex-row p-2">
                    <span className="text-4xl mx-auto"> Bom dia, {user}</span>
                    <div className="flex flex-row gap-2">
                        <img src={userPfp} className="w-8 h-8 rounded-[50%]"/>
                        <span className="font-lato-regular mr-16 text-end">{user}</span>
                    </div>
                </div>
                <span className="self-start ml-8 text-lg mt-12">Dashboard</span>
                <div className="flex flex-col w-[60%] h-[100%]">
                    <div className="grid grid-cols-2 place-content-between w-[100%] h-[40%] gap-4 p-5">
                        {/* quantidade de digitos diferentes muda as dimensoes dos cartões, arrumar isso */}
                        <div className={classeCards}>
                            <div className="flex flex-col mx-2 gap-6">
                                <span className="font-lato-regular text-start pl-2 pt-2">Saldo</span>
                                <span className="text-xl pl-2 text-left">{saldo1}</span>
                            </div>
                            <img src="\src\assets\Icone Saldo.svg" alt="icone saldo" className="p-4 ml-4" />
                        </div>
                        <div className={classeCards}>
                            <div className="flex flex-col mx-2 gap-6">
                                <span className="font-lato-regular text-start pl-2 pt-2">Despesas Mensais</span>
                                <span className="text-xl pl-2 text-left">{saldo2}</span>
                            </div>
                            <img src="\src\assets\Icone Despesas.svg" alt="icone despesas" className="p-4 ml-4" />
                        </div>
                        <div className={classeCards}>
                            <div className="flex flex-col mx-2 gap-6">
                                <span className="font-lato-regular text-start pl-2 pt-2">Cartão de Crédito</span>
                                <span className="text-xl pl-2 text-left">{saldo3}</span>
                            </div>
                            <img src="\src\assets\Icone Cartão.svg" alt="icone cartão crédito" className="p-4 ml-4" />
                        </div>
                        <div className={classeCards}>
                            <div className="flex flex-col mx-2 gap-6">
                                <span className="font-lato-regular text-start pl-2 pt-2">Próximos Gastos</span>
                                <span className="text-xl pl-2 text-left">{saldo4}</span>
                            </div>
                            <img src="\src\assets\Icone Prox.svg" alt="icone proximos gastos" className="p-4 ml-4" />
                        </div>
                    </div>
                    <div className="flex flex-col ml-8">
                        <span className="text-start text-lg mb-8">Para onde seu dinheiro foi?</span>
                        <div className="flex flex-col">
                            <div className="flex justify-between items-center mb-2 font-lato-regular">
                                <span className="text-md text-start">Mercado</span>
                                <span className="text-md text-end">R$450.00 / R$500.00</span> {/*fazer map com dados?*/}
                            </div>
                            <progress value={0.5} className=" h-3 rounded-full bg-theme-light [&::-moz-progress-bar]:bg-receita-highlight" />
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
        

    )
}