import Footer from "./Footer"
import Sidebar from "./Sidebar"

export default function Dashboard() {
    
    const fakeData = {
        saldo1: '1.200',
        saldo2: 10.500,
        saldo3: 3.875,
        saldo4: 999.12
    }

    return(
        <div className="flex flex-wrap">
            <div className="flex-[0_0_15%]">
                <Sidebar/>
            </div>
            <div className="lato-bold flex flex-col text-black flex-[0_0_85%]">
                <div className="flex flex-row p-2">
                    <span className="text-4xl mx-auto"> Bom dia, Nome de Usuário</span>
                    <span className="lato-regular mr-16">Nome usuário</span>
                </div>
                <span className="self-start ml-8 text-lg mt-12">Dashboard</span>
                <div className="flex flex-col w-[60%] h-[100%]">
                    <div className="grid grid-cols-2 w-[80%] h-[40%] pl-10 pt-10">
                        <div className="bg-white-div rounded-2xl border-[#DEDCFF] border-1 shadow-md h-24 w-70 flex flex-row">
                            <div className="flex flex-col mx-2 gap-6">
                                <span className="lato-regular text-start pl-2 pt-2">Saldo</span>
                                <span className="text-xl pl-2">R${fakeData.saldo1}</span>
                            </div>
                            <img src="\src\assets\Icone Saldo.svg" alt="icone saldo" className="p-4 ml-4" />
                        </div>
                        <div className="bg-white-div rounded-2xl border-[#DEDCFF] border-1 shadow-md h-24 w-70 flex flex-row">
                            <div className="flex flex-col mx-2 gap-6">
                                <span className="lato-regular text-start pl-2 pt-2">Despesas Mensais</span>
                                <span className="text-xl pl-2">R${fakeData.saldo2}</span>
                            </div>
                            <img src="\src\assets\Icone Despesas.svg" alt="icone despesas" className="p-4 ml-4" />
                        </div>
                        <div className="bg-white-div rounded-2xl border-[#DEDCFF] border-1 shadow-md h-24 w-70 flex flex-row">
                            <div className="flex flex-col mx-2 gap-6">
                                <span className="lato-regular text-start pl-2 pt-2">Cartão de Crédito</span>
                                <span className="text-xl pl-2">R${fakeData.saldo3}</span>
                            </div>
                            <img src="\src\assets\Icone Cartão.svg" alt="icone cartão crédito" className="p-4 ml-4" />
                        </div>
                        <div className="bg-white-div rounded-2xl border-[#DEDCFF] border-1 shadow-md h-24 w-70 flex flex-row">
                            <div className="flex flex-col mx-2 gap-6">
                                <span className="lato-regular text-start pl-2 pt-2">Próximos Gastos</span>
                                <span className="text-xl pl-2">R${fakeData.saldo4}</span>
                            </div>
                            <img src="\src\assets\Icone Prox.svg" alt="icone proximos gastos" className="p-4 ml-4" />
                        </div>
                    </div>
                    <div className="flex flex-col ml-8">
                        <span className="text-start text-lg mb-8">Para onde seu dinheiro foi?</span>
                        <div className="flex flex-col">
                            <div className="flex justify-between items-center mb-2 lato-regular">
                                <span className="text-md text-start">Mercado</span>
                                <span className="text-md text-end">R$450.00 / R$500.00</span> {/*fazer map com dados igual sidebar*/}
                            </div>
                            <progress value={0.5} className=" h-3 rounded-full bg-[#DEDCFF] [&::-moz-progress-bar]:bg-[#00CB9E]" />
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
        

    )
}