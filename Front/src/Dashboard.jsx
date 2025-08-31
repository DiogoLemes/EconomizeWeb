export default function Dashboard() {
    return(
        <div className="lato-bold flex flex-col text-black">
            <div className="flex flex-row p-2">
                <span className="text-4xl mx-auto"> Bom dia, Nome de Usuário</span>
                <span className="lato-regular mr-16">Nome usuário</span>
            </div>
            <span className="self-start ml-8 text-lg mt-12">Dashboard</span>
            <span className="self-start ml-8 text-2xl mt-12">Você não possui despesas!</span>
            <img src="\src\assets\undraw_processing.svg" alt="processing_icon" className="w-[25%] h-[25%] mx-auto"/>
            <span className="self-start ml-8 text-2xl mt-4">Clique aqui para criar <br/>uma nova despesa!</span>
            <img src="\src\assets\Arrow.svg" alt="Seta apontando para botão à esquerda" className="ml-8 w-36 h-18"/>
        </div>
    )
}