import { useEffect } from "react"
import Footer from "./Footer"
import Sidebar from "./Sidebar"

export default function Investimentos() {

    function ConsoleLogTeste(){
        
        const data = fetch("/monthGoals/1", {
            method: "GET",
            // body: JSON.stringify({
            //     nome: "example" 
            // }),
        })
        console.log(Response.json(data))
    }

    // useEffect(() => {
    //     const fetchData = async () =>
    //     {
    //         const result = await fetch("http://localhost:3000/monthGoals/1")
    //         const jsonResult = await result.json()
    //         console.log(jsonResult)
    //     }

    //     fetchData()
    // }, [])
    
    return(
        <div className="flex flex-wrap">
            <div className="flex-[0_0_15%]">
                <Sidebar/>
            </div>
            <div className="flex-[0_0_85%]">
                <div className="lato-bold flex flex-col text-black">
                    <div className="flex flex-row p-2">
                        <span className="text-4xl mx-auto">Investimentos</span>
                        <span className="lato-regular mr-16 text-end">Nome usuário</span>
                    </div>
                    <div className="flex flex-row justify-between p-4 h-100 w-200 ">
                        <div className="border-[#d4d4d4] border-2 border-dashed rounded-md flex flex-col text-start p-2 h-80 w-80">
                            <span>Metas Ativas</span>
                            <span>Ainda nenhuma meta criada</span>
                        </div>
                        <div className="border-[#d4d4d4] border-2 border-dashed rounded-md flex flex-col text-start p-2 h-80 w-80">
                            <span>Metas Concluídas</span>
                            <span>Ainda nenhuma meta alcançada</span>
                        </div>
                    </div>
                    <button onClick={()=> ConsoleLogTeste()} className="bg-amber-400 h-40 w-40"></button>
                </div>
            </div>
            <Footer/>
        </div>
    )
}