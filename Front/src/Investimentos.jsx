import Footer from "./Footer"
import Sidebar from "./Sidebar"

export default function Investimentos() {
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
                </div>
            </div>
            <Footer/>
        </div>
    )
}