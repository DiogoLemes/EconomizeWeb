import Footer from "./Components/Footer"
import Sidebar from "./Components/Sidebar"
import Header from "./Components/Header"
import Button from '@mui/material/Button';

export default function Transacoes() {

    return(
        <div className="flex flex-wrap">
                    <div className="flex-[0_0_15%]">
                        <Sidebar selected="transacoes"/>
                    </div>
                    <div className="flex-[0_0_85%]">
                        <div className="font-lato-bold flex flex-col text-black">
                            <Header text={"Transações"}/>
                        </div>
                    </div>
                    <Footer/>
                </div>
    )
}