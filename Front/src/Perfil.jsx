import Footer from "./Footer"
import Sidebar from "./Sidebar"

export default function Perfil() {
    return(
        <div className="flex flex-wrap">
            <div className="flex-[0_0_15%]">
                <Sidebar/>
            </div>
            <div className="flex-[0_0_85%]">
                <div className="lato-bold flex flex-col text-black">
                    <div className="flex flex-row p-2">
                        <span className="text-4xl mx-auto"> Perfil</span>
                        <span className="lato-regular mr-16 text-end">Nome usuário</span>
                    </div>
                    <div className="border-black border-2 h-[50vh] w-[50vw] self-center mb-10">
                        {/* (form de perfil) */}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}