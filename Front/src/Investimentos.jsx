import Footer from "./Components/Footer"
import Sidebar from "./Components/Sidebar"
import { useEffect, useState } from "react"
import { useContext } from "react"
import { AuthContext } from "./UserContext"
import Header from "./Components/Header"
import {ThemeSetter} from "./Hooks/ThemeSetter"

export default function Investimentos() {
    
    const {user, setUser, id, setId, email, setEmail, userPfp, setUserPfp} = useContext(AuthContext)

    ThemeSetter()

    const loggedInUsername = sessionStorage.getItem("loggedUsername")
    setUser(loggedInUsername)
    const loggedInUserId = sessionStorage.getItem("userId")
    setId(loggedInUserId)

    const [metasAtivas, setMetasAtivas] = useState([]);
    const [histMetas, setHistMetas] = useState([]);

    useEffect(() => {
        
        async function fetchDataMetasAtuais() {
            const res = await fetch(`http://localhost:3000/goals/active/${id}`);
            const data = await res.json();

            setMetasAtivas(data);
        }

        fetchDataMetasAtuais();
    }, []);

    useEffect(() => {
        
        async function fetchDataHistMetas() {
            const res = await fetch(`http://localhost:3000/goals/${id}`);
            const data = await res.json();

            setHistMetas(data);
        }

        fetchDataHistMetas();
    }, []);

        
    return(
        <div className="flex flex-col">
            <div className="flex flex-row h-[90vh]">
                <div className="w-[15%]">
                    <Sidebar selected="investimentos"/>
                </div>
                <div className="w-[85%]">
                    <div className="font-lato-bold flex flex-col text-black">
                    <Header text={"Investimentos"}/>
                        <div className="flex flex-row justify-between p-4 w-[90%] gap-10">
                            <div className="border-gray-outline/50 border-1 border-dashed rounded-md flex flex-col text-start p-2 w-[50%] gap-4 overflow-y-scroll h-180">
                                <span className="font-lato-bold">Metas Ativas:</span>
                                {metasAtivas.length == 0 ? <span className="font-lato-bold">Ainda nenhuma meta criada</span> : 

                                metasAtivas.map((meta, index) => {
                                    let progresso = (meta.valor_atual / meta.valor_meta) * 100
                                    let textoTipo
                                    let bgMeta
                                    let tipoMeta
                                    let progressoMeta
                                    let textoMeta
                                    switch(meta.tipo){
                                        case 1:
                                            bgMeta = "bg-categoria-bg rounded-xl p-4 font-lato-bold flex flex-col gap-2"
                                            tipoMeta = "bg-categoria-text-bg text-categoria-text rounded-md p-1"
                                            progressoMeta = `h-3 w-full rounded-full overflow-hidden appearance-none bg-categoria-text-bg [&::-moz-progress-bar]:bg-categoria-text
                                                            [&::-webkit-progress-bar]:bg-categoria-text-bg [&::-webkit-progress-value]:bg-categoria-text`
                                            textoMeta = "text-categoria-text"
                                            textoTipo = "Poupança"
                                            break;
                                        case 2:
                                            bgMeta = "bg-receita-bg rounded-xl p-4 font-lato-bold flex flex-col gap-2"
                                            tipoMeta = "bg-receita-text-bg text-receita-text rounded-md p-1"
                                            progressoMeta = `h-3 w-full rounded-full overflow-hidden appearance-none bg-receita-text-bg [&::-moz-progress-bar]:bg-receita-text
                                                            [&::-webkit-progress-bar]:bg-receita-text-bg [&::-webkit-progress-value]:bg-receita-text`
                                            textoMeta = "text-receita-text"
                                            textoTipo = "Compra"
                                            break;
                                        case 3:
                                            bgMeta = "bg-meta-bg rounded-xl p-4 font-lato-bold flex flex-col gap-2"
                                            tipoMeta = "bg-meta-text-bg text-meta-text rounded-md p-1"
                                            progressoMeta = `h-3 w-full rounded-full overflow-hidden appearance-none bg-meta-text-bg [&::-moz-progress-bar]:bg-meta-text
                                                            [&::-webkit-progress-bar]:bg-meta-text-bg [&::-webkit-progress-value]:bg-meta-text`
                                            textoMeta = "text-meta-text"
                                            textoTipo = "Viagem"
                                            break;
                                        case 4:
                                            bgMeta = "bg-despesa-bg rounded-xl p-4 font-lato-bold flex flex-col gap-2"
                                            tipoMeta = "bg-despesa-text-bg text-despesa-text rounded-md p-1"
                                            progressoMeta = `h-3 w-full rounded-full overflow-hidden appearance-none bg-despesa-text-bg [&::-moz-progress-bar]:bg-despesa-text
                                                            [&::-webkit-progress-bar]:bg-despesa-text-bg [&::-webkit-progress-value]:bg-despesa-text`
                                            textoMeta = "text-despesa-text"
                                            textoTipo = "Emergência"
                                            break;
                                        default:
                                            break;
                                    }

                                    return (
                                        <div key={index} className={bgMeta}>
                                            <div className="flex justify-between">
                                                <span className="text-xl">{meta.nome}</span>
                                                <span className={tipoMeta}>{textoTipo}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm">R$ {meta.valor_atual} / {meta.valor_meta}</span>
                                                <span className={textoMeta}>{progresso.toFixed(0)}%</span>
                                            </div>
                                            <progress value={progresso / 100} className={progressoMeta} />
                                            <div className="flex justify-between">
                                                <span className="text-sm">Prazo: {meta.data_fim == null ? '-' : meta.data_fim}</span>
                                                <span className="text-sm">Continue assim</span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="border-gray-outline/50 border-1 border-dashed rounded-md flex flex-col text-start p-2 w-[50%] gap-4 overflow-y-scroll h-180">
                                <span className="font-lato-bold">Metas Concluídas:</span>
                                {histMetas.length == 0 ? <span className="font-lato-bold">Nenhuma meta concluída</span> : 

                                histMetas.map((meta, index) => {
                                    
                                    let progresso = (meta.valor_atual / meta.valor_meta) * 100
                                    let textoTipo
                                    let bgMeta
                                    let tipoMeta
                                    let progressoMeta
                                    let textoMeta

                                    switch(meta.tipo){
                                        case 1:
                                            bgMeta = "bg-categoria-bg rounded-xl p-4 font-lato-bold flex flex-col gap-2 opacity-50"
                                            tipoMeta = "bg-categoria-text-bg text-categoria-text rounded-md p-1"
                                            progressoMeta = `h-3 w-full rounded-full overflow-hidden appearance-none bg-categoria-text-bg [&::-moz-progress-bar]:bg-categoria-text
                                                            [&::-webkit-progress-bar]:bg-categoria-text-bg [&::-webkit-progress-value]:bg-categoria-text`
                                            textoMeta = "text-categoria-text"
                                            textoTipo = "Poupança"
                                            break;
                                        case 2:
                                            bgMeta = "bg-receita-bg rounded-xl p-4 font-lato-bold flex flex-col gap-2 opacity-50"
                                            tipoMeta = "bg-receita-text-bg text-receita-text rounded-md p-1"
                                            progressoMeta = `h-3 w-full rounded-full overflow-hidden appearance-none bg-receita-text-bg [&::-moz-progress-bar]:bg-receita-text
                                                            [&::-webkit-progress-bar]:bg-receita-text-bg [&::-webkit-progress-value]:bg-receita-text`
                                            textoMeta = "text-receita-text"
                                            textoTipo = "Compra"
                                            break;
                                        case 3:
                                            bgMeta = "bg-meta-bg rounded-xl p-4 font-lato-bold flex flex-col gap-2 opacity-50"
                                            tipoMeta = "bg-meta-text-bg text-meta-text rounded-md p-1"
                                            progressoMeta = `h-3 w-full rounded-full overflow-hidden appearance-none bg-meta-text-bg [&::-moz-progress-bar]:bg-meta-text
                                                            [&::-webkit-progress-bar]:bg-meta-text-bg [&::-webkit-progress-value]:bg-meta-text`
                                            textoMeta = "text-meta-text"
                                            textoTipo = "Viagem"
                                            break;
                                        case 4:
                                            bgMeta = "bg-despesa-bg rounded-xl p-4 font-lato-bold flex flex-col gap-2 opacity-50"
                                            tipoMeta = "bg-despesa-text-bg text-despesa-text rounded-md p-1" 
                                            progressoMeta = `h-3 w-full rounded-full overflow-hidden appearance-none bg-despesa-text-bg [&::-moz-progress-bar]:bg-despesa-text
                                                            [&::-webkit-progress-bar]:bg-despesa-text-bg [&::-webkit-progress-value]:bg-despesa-text`
                                            textoMeta = "text-despesa-text"
                                            textoTipo = "Emergência"
                                            break;
                                        default:
                                            break;
                                    }

                                    return (
                                        <div key={index} className={bgMeta}>
                                            <div className="flex justify-between">
                                                <span className="text-xl">{meta.nome}</span>
                                                <span className={tipoMeta}>{textoTipo}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm">R$ {meta.valor_atual} / {meta.valor_meta}</span>
                                                <span className={textoMeta}>{progresso.toFixed(0)}%</span>
                                            </div>
                                            <progress value={progresso / 100} className={progressoMeta} />
                                            <div className="flex justify-between">
                                                <span className="text-sm">Prazo: {meta.data_fim == null ? '-' : meta.data_fim}</span>
                                                <span className="text-sm">Continue assim</span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}