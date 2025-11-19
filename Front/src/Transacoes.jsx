import Footer from "./Components/Footer"
import Sidebar from "./Components/Sidebar"
import Header from "./Components/Header"
import Button from '@mui/material/Button';
import {ThemeSetter} from "./Hooks/ThemeSetter"

export default function Transacoes() {

    ThemeSetter()

    return(
        <div className="flex flex-col">
            <div className="flex flex-row h-[90vh]">
                <div className="w-[15%]">
                    <Sidebar selected="transacoes"/>
                </div>
                <div className="w-[85%] bg-theme-bg text-text-theme">
                    <div className="font-lato-bold flex flex-col">
                        <Header text={"Transações"}/>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}