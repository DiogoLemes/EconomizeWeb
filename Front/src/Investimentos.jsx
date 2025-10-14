import Footer from "./Footer"
import Sidebar from "./Sidebar"
import { useEffect, useState } from "react"
import { useContext } from "react"
import { AuthContext } from "./UserContext"

export default function Investimentos() {
    
    const {user, setUser, id, setId, email, setEmail} = useContext(AuthContext)

    const loggedInUsername = sessionStorage.getItem("loggedUsername")
    setUser(loggedInUsername)
    const loggedInUserId = sessionStorage.getItem("userId")
    setId(loggedInUserId)

    const [metasAtivas, setMetasAtivas] = useState([]);
    const [histMetas, setHistMetas] = useState([]);

    useEffect(() => {
        
        async function fetchDataMetasAtuais() {
            const res = await fetch(`http://localhost:3000/monthGoals/${id}`);
            const data = await res.json();

            setMetasAtivas(data);
        }

        fetchDataMetasAtuais();
    }, []);

    useEffect(() => {
        
        async function fetchDataHistMetas() {
            const res = await fetch(`http://localhost:3000/histGoals/${id}`);
            const data = await res.json();

            setHistMetas(data);
            console.log(histMetas)
        }

        fetchDataHistMetas();
    }, []);

        
    return(
        <div className="flex flex-wrap">
            <div className="flex-[0_0_15%]">
                <Sidebar selected="investimentos"/>
            </div>
            <div className="flex-[0_0_85%]">
                <div className="font-lato-bold flex flex-col text-black">
                    <div className="flex flex-row p-2">
                        <span className="text-4xl mx-auto">Investimentos</span>
                        <span className="font-lato-regular mr-16 text-end">{user}</span>
                    </div>
                    <div className="flex flex-row justify-between p-4 w-[90%] gap-10">
                        <div className="border-[#d4d4d4] border-1 border-dashed rounded-md flex flex-col text-start p-2 w-[50%] gap-4 overflow-y-scroll h-180">
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
                                        bgMeta = "bg-[#DEDCFF] rounded-xl p-4 font-lato-bold flex flex-col gap-2"
                                        tipoMeta = "bg-[#C9C6FF] text-[#3A00E3] rounded-md p-1"
                                        progressoMeta = "h-3 rounded-full bg-[#C9C6FF] [&::-moz-progress-bar]:bg-[#3A00E3]"
                                        textoMeta = "text-[#3A00E3]"
                                        textoTipo = "Poupança"
                                        break;
                                    case 2:
                                        bgMeta = "bg-[#D1FAE5] rounded-xl p-4 font-lato-bold flex flex-col gap-2"
                                        tipoMeta = "bg-[#A7F3D0] text-[#047857] rounded-md p-1"
                                        progressoMeta = "h-3 rounded-full bg-[#A7F3D0] [&::-moz-progress-bar]:bg-[#059669]"
                                        textoMeta = "text-[#047857]"
                                        textoTipo = "Compra"
                                        break;
                                    case 3:
                                        bgMeta = "bg-[#FFEED9] rounded-xl p-4 font-lato-bold flex flex-col gap-2"
                                        tipoMeta = "bg-[#FFD29D] text-[#FF8D00] rounded-md p-1"
                                        progressoMeta = "h-3 rounded-full bg-[#FFD29D] [&::-moz-progress-bar]:bg-[#FFB151]"
                                        textoMeta = "text-[#FF8D00]"
                                        textoTipo = "Viagem"
                                        break;
                                    case 4:
                                        bgMeta = "bg-[#FFD0D0] rounded-xl p-4 font-lato-bold flex flex-col gap-2"
                                        tipoMeta = "bg-[#DB7A7A] text-[#A30000] rounded-md p-1"
                                        progressoMeta = "h-3 rounded-full bg-[#DB7A7A] [&::-moz-progress-bar]:bg-[#A30000]"
                                        textoMeta = "text-[#A30000]"
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
                        <div className="border-[#d4d4d4] border-1 border-dashed rounded-md flex flex-col text-start p-2 w-[50%] gap-4 overflow-y-scroll h-180">
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
                                        bgMeta = "bg-[#DEDCFF] rounded-xl p-4 font-lato-bold flex flex-col gap-2 opacity-50"
                                        tipoMeta = "bg-[#C9C6FF] text-[#3A00E3] rounded-md p-1"
                                        progressoMeta = "h-3 rounded-full bg-[#C9C6FF] [&::-moz-progress-bar]:bg-[#3A00E3]"
                                        textoMeta = "text-[#3A00E3]"
                                        textoTipo = "Poupança"
                                        break;
                                    case 2:
                                        bgMeta = "bg-[#D1FAE5] rounded-xl p-4 font-lato-bold flex flex-col gap-2 opacity-50"
                                        tipoMeta = "bg-[#A7F3D0] text-[#047857] rounded-md p-1"
                                        progressoMeta = "h-3 rounded-full bg-[#A7F3D0] [&::-moz-progress-bar]:bg-[#059669]"
                                        textoMeta = "text-[#047857]"
                                        textoTipo = "Compra"
                                        break;
                                    case 3:
                                        bgMeta = "bg-[#FFEED9] rounded-xl p-4 font-lato-bold flex flex-col gap-2 opacity-50"
                                        tipoMeta = "bg-[#FFD29D] text-[#FF8D00] rounded-md p-1"
                                        progressoMeta = "h-3 rounded-full bg-[#FFD29D] [&::-moz-progress-bar]:bg-[#FFB151]"
                                        textoMeta = "text-[#FF8D00]"
                                        textoTipo = "Viagem"
                                        break;
                                    case 4:
                                        bgMeta = "bg-[#FFD0D0] rounded-xl p-4 font-lato-bold flex flex-col gap-2 opacity-50"
                                        tipoMeta = "bg-[#DB7A7A] text-[#A30000] rounded-md p-1" 
                                        progressoMeta = "h-3 rounded-full bg-[#DB7A7A] [&::-moz-progress-bar]:bg-[#A30000]"
                                        textoMeta = "text-[#A30000]"
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
            <Footer/>
        </div>
    )
}