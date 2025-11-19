import NovaCategoria from "./Nova Categoria.jsx"
import NovaMeta from "./Nova Meta.jsx"
import NovaDespesa from "./Nova Despesa.jsx"
import NovaReceita from "./Nova Receita.jsx"
import BotoesPopup from "./BotoesPopup.jsx"
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
            {/* FUNDO PRETO - Mude de z-1 para z-40 */}
            <div className="bg-black opacity-30 w-screen h-screen fixed inset-0 z-40" />

            {/* FUNDO DESFOCADO - Mude de z-1 para z-40 */}
            <div className="w-screen h-screen fixed inset-0 z-40 backdrop-blur-[2px]">
                
                {/* BOTÃO FECHAR - Mude de z-2 para z-50 */}
                <button onClick={onClose} className="text-4xl text-white fixed z-50 top-[20%] left-[72%] hover:cursor-pointer">
                    <img src="\src\assets\botão fechar.png" alt="fechar" className="w-8 h-8" />
                </button>

                {/* COMPONENTE (BotoesPopup, etc.) */}
                {renderComponente()}
            </div>
        </div>
    )
}