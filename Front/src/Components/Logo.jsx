export default function Logo() {
    return (
        <div className="flex p-2">
            <img src="src\assets\logo.svg" className="w-20 h-20" alt="Economize Logo"></img>
            <p className="font-lato-bold text-logo-primary my-8 text-4xl">Economize</p>
        </div>
////////////Transacoes
import Footer from "./Footer"
import Sidebar from "./Sidebar"

export default function Transacoes() {

    return(
        <div className="flex flex-wrap">
                    <div className="flex-[0_0_15%]">
                        <Sidebar selected="transacoes"/>
                    </div>
                    <div className="flex-[0_0_85%]">
                        <div className="font-lato-bold flex flex-col text-black">
                            <div className="flex flex-row p-2">
                                <span className="text-4xl mx-auto">Transações</span>
                                <span className="font-lato-regular mr-16 text-end">Nome usuário</span>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
    )
}