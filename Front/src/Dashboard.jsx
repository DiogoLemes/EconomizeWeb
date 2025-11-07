import Footer from "./Components/Footer"
import Sidebar from "./Components/Sidebar"
import { useContext } from "react"
import {AuthContext} from "./UserContext"
import Header from "./Components/Header"
import MUICalendar from "./Components/MUICalendar"
import MUIDonutChart from "./Components/MuiDonutChart"
import {ThemeSetter} from "./Hooks/ThemeSetter"

export default function Dashboard() {

    const {user, setUser, id, setId, email, setEmail, userPfp, setUserPfp} = useContext(AuthContext)

    ThemeSetter()

    const loggedInUsername = sessionStorage.getItem("loggedUsername")
    setUser(loggedInUsername)

    const classeCards = "bg-white-div rounded-2xl border-theme-light border-1 shadow-md h-[6em] w-[20em] flex flex-row justify-between"

    let saldo1 = 1000
    let saldo2 = 12345
    let saldo3 = 4
    let saldo4 = 23480000

    saldo1 = saldo1.toLocaleString("pt-BR", {style: "currency", currency: "BRL"}) //tolocalestring ou intl.number ver dps
    saldo2 = saldo2.toLocaleString("pt-BR", {style: "currency", currency: "BRL"}) //esses numeros tem q pegar do banco dps msm
    saldo3 = saldo3.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})
    saldo4 = saldo4.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})

    return(
        <div className="flex flex-col">
           <div className="flex flex-row h-[90vh]">
                <div className="w-[15%]">
                    <Sidebar selected="dashboard"/>
                </div>
                <div className="font-lato-bold flex flex-col text-black w-[85%] bg-light-bg">
                    <Header text={`Bom dia, ${user}`}/>
                    <div className="flex flex-row h-[100%]">
                        <div className="flex flex-col w-[60%] min-w-[700px]">
                            <span className="self-start ml-8 text-lg mt-12">Dashboard</span>
                            <div className="grid grid-cols-2 place-content-between w-[100%] h-[40%] gap-4 p-5">
                                {/* quantidade de digitos diferentes muda as dimensoes dos cartões, arrumar isso */}
                                <div className={classeCards}>
                                    <div className="flex flex-col p-2 gap-6">
                                        <span className="font-lato-regular text-start">Saldo</span>
                                        <span className="text-xl text-left">{saldo1}</span>
                                    </div>
                                    <img src="\src\assets\Icone Saldo.svg" alt="ícone saldo" className="p-4" />
                                </div>
                                <div className={classeCards}>
                                    <div className="flex flex-col p-2 gap-6">
                                        <span className="font-lato-regular text-start">Despesas Mensais</span>
                                        <span className="text-xl text-left">{saldo2}</span>
                                    </div>
                                    <img src="\src\assets\Icone Despesas.svg" alt="ícone despesas" className="p-4" />
                                </div>
                                <div className={classeCards}>
                                    <div className="flex flex-col p-2 gap-6">
                                        <span className="font-lato-regular text-start">Cartão de Crédito</span>
                                        <span className="text-xl text-left">{saldo3}</span>
                                    </div>
                                    <img src="\src\assets\Icone Cartão.svg" alt="ícone cartão crédito" className="p-4" />
                                </div>
                                <div className={classeCards}>
                                    <div className="flex flex-col p-2 gap-6">
                                        <span className="font-lato-regular text-start">Próximos Gastos</span>
                                        <span className="text-xl text-left">{saldo4}</span>
                                    </div>
                                    <img src="\src\assets\Icone Prox.svg" alt="ícone próximos gastos" className="p-4" />
                                </div>
                            </div>
                            <div className="flex flex-col ml-8 mt-4">
                                <span className="text-start text-lg mb-5">Para onde seu dinheiro foi?</span>
                                <div className="flex flex-col">
                                    <div className="flex justify-between items-center mb-2 font-lato-regular">
                                        <span className="text-md text-start">Mercado</span>
                                        <span className="text-md text-end">R$450.00 / R$500.00</span> {/*fazer map com dados?*/}
                                    </div>
                                    <progress value={0.5} className="h-3 w-full rounded-full overflow-hidden appearance-none bg-theme-light
                                        [&::-webkit-progress-bar]:bg-theme-light [&::-webkit-progress-value]:bg-receita-highlight
                                        [&::-moz-progress-bar]:bg-receita-highlight" />
                                </div>
                            </div>
                        </div>
                        <div className="w-[40%] flex flex-col justify-evenly">
                            <MUICalendar/>
                            <div className="bg-theme-light w-80 h-85 mx-auto rounded-3xl p-5">
                                <div className="h-5 flex justify-evenly">
                                    <div className="flex flex-row gap-2 items-center p-2">
                                        <p className="bg-receita-button-active h-4 w-4 border"></p>
                                        <span>Receitas</span>
                                    </div>
                                    <div className="flex flex-row gap-2 items-center p-2">
                                        <p className="bg-despesa-button-active h-4 w-4 border"></p>
                                        <span>Despesas</span>
                                    </div>
                                </div>
                                <div className="h-70 flex justify-center">
                                    <MUIDonutChart/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div><Footer/></div>
        </div>
    )
}