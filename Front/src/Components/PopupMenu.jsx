import NovaCategoria from "../Nova Categoria"
import NovaMeta from "../Nova Meta"
import NovaDespesa from "../Nova Despesa"
import NovaReceita from "../Nova Receita"
import BotoesPopup from "./BotoesPopup"
import { useState } from "react"


export default function PopupMenu ({onClose}) {

    const [componenteAtual, setComponenteAtual] = useState('BotoesPopup')

    const trocarComponente = (novo) => setComponenteAtual(novo)

    const renderComponente = () => {
        switch(componenteAtual) {
            case 'BotoesPopup':
                return <BotoesPopup trocarComponente={trocarComponente}/>
            case 'NovaCategoria':
                return <NovaCategoria onClose={onClose}/>
            case 'NovaDespesa':
                return <NovaDespesa onClose={onClose}/>
            case 'NovaReceita':
                return <NovaReceita onClose={onClose}/>
            case 'NovaMeta':
                return <NovaMeta onClose={onClose}/>
            default:
                return <BotoesPopup trocarComponente={trocarComponente}/>
        }
    }

    return (
        <div>
            <div className="bg-black opacity-30 w-screen h-screen fixed inset-0 z-1"/>
            <div className="w-screen h-screen fixed inset-0 z-1 backdrop-blur-[2px]">
                <button onClick={onClose} className="text-4xl text-white fixed z-2 top-[20%] left-[72%] hover:cursor-pointer">
                    <img src="\src\assets\botão fechar.png" alt="fechar" className="w-8 h-8"/>
                </button>
                {renderComponente()}
            </div>
        </div>
    )
}