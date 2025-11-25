import { useContext } from "react"
import {AuthContext} from "./UserContext"
import Footer from "./Components/Footer"
import { useEffect, useState } from "react"
import Sidebar from "./Components/Sidebar"
import Header from "./Components/Header"
import MUICalendar from "./Components/MUICalendar"
import MUIDonutChart from "./Components/MUIDonutChart"
import {ThemeSetter} from "./Functions/ThemeSetter"
import {HomeRedirect} from "./Functions/HomeRedirect"

export default function Dashboard() {
    
    HomeRedirect() //redireciona o usuario para a tela de login/cadastro se entrar na url sem passar pelo login
    ThemeSetter() //verifica tema do usuario salvo no localStorage
    
    //CSS
    const classeCards = "bg-white-div rounded-2xl border-theme-light border-1 shadow-md h-[6em] w-[20em] flex flex-row justify-between"

    //UseContext de dados do usuário
    const {user, setUser, id, setId, email, setEmail, userPfp, setUserPfp} = useContext(AuthContext)

    //tela de dash vazia
    const [emptyDashboard, setEmptyDashboard] = useState(localStorage.getItem("empty dashboard"))
    
    //define (set) o header
    useEffect(() => {
        const loggedInUsername = sessionStorage.getItem("loggedUsername")
        const loggedInUserId = sessionStorage.getItem("userId")
        setId(Number(loggedInUserId))
        setUser(loggedInUsername)
    }, [])
    
    //regula hora da mensagem de bom dia
    const diaAtual = new Date()
    const horaAtual = diaAtual.getHours()
    const [msgHora, setMsgHora] = useState("")
    useEffect(() => {
    if(horaAtual > 6 && horaAtual < 12){
        setMsgHora("Bom Dia")
    }
    else if(horaAtual >= 12 && horaAtual < 18){
        setMsgHora("Boa Tarde")
    }
    else {
        setMsgHora("Boa Noite")
    }
    }, [])

    const formatarValor = (valor) => {
        return valor.toLocaleString('pt-BR', { 
            style: 'currency', 
            currency: 'BRL' 
        })
    }

    //dados dos cards
    const [saldo, setSaldo] = useState(0)
    const [despesas, setDespesas] = useState(0)
    const [cartao, setCartao] = useState("Indisponível")
    const [faturaMes, setFaturaMes] = useState(0)

    //dados do grafico de donut
    const [muiChartReceitas, setMuiChartReceitas] = useState(0)
    const [muiChartDespesas, setMuiChartDespesas] = useState(0)

    //pega os dados do usuário para os cards
    useEffect(() => {
        if (!id) return // não roda se id for 0 ou undefined
        
        async function fetchSaldo() {

            const res = await fetch(`http://localhost:3000/dashboard/${id}/saldo`)
            const data = await res.json()

            let saldoValor = data.saldo ?? "Erro" //mostra Erro caso não consiga carregar
            if(saldoValor == data.saldo)
            {
                saldoValor = Number(saldoValor)
            } 
            else 
            {
                saldoValor = "Erro"
            }

            const saldoFinal = formatarValor(saldoValor)

            setSaldo(saldoFinal)
            setMuiChartReceitas(Number(saldoValor))
            
        }

        async function fetchDespesas() {
            const res = await fetch(`http://localhost:3000/dashboard/${id}/despesa`)
            const data = await res.json()

            let despesaValor = data.despesa ?? "Erro"
            if(despesaValor == data.despesa)
            {
                despesaValor = Number(despesaValor)
            }
            else 
            {
                despesaValor = "Erro"
            }

            const despesaFinal = formatarValor(despesaValor)

            setDespesas(despesaFinal)
            setMuiChartDespesas(Number(despesaValor))
        }

        // async function fetchCartao() {
        //     const res = await fetch(`http://localhost:3000/dashboard/${id}/Cartao`)
        //     const data = await res.json()
        //     console.log("data Cartao = ", data.Cartao)

        //     let CartaoValor = data.Cartao ?? "Erro" //mostra Erro caso não consiga carregar
        //     if(CartaoValor == data.Cartao){
        //         CartaoValor = Number(CartaoValor)
        //     } else {CartaoValor = "Erro"}

        //     const CartaoFinal = formatarValor(CartaoValor)

        //     setCartao(CartaoFinal)
        // }

        async function fetchFaturaMes() {
            const res = await fetch(`http://localhost:3000/dashboard/${id}/faturas/mes`)
            const data = await res.json()

            let faturaMesValor = data.fatura_mes ?? "Erro" //mostra Erro caso não consiga carregar
            if(faturaMesValor == data.fatura_mes){
                faturaMesValor = Number(faturaMesValor)
            } else {faturaMesValor = "Erro"}

            const FaturaMesFinal = formatarValor(faturaMesValor)

            setFaturaMes(FaturaMesFinal)
        }

        fetchSaldo()
        fetchDespesas()
        //fetchCartao()
        fetchFaturaMes()
    }, [id])

    //pega as transações de maior valor para a parte do "Para onde seu dinheiro foi"
    const [dataAtual, setDataAtual] = useState(new Date())
    const [transacoesData, setTransacoesData] = useState([])
    const [maioresTransacoes, setMaioresTransacoes] = useState([])

    useEffect(() => {
        async function fetchTransacoes() {
            if (!id) return

            const mes = dataAtual.getMonth() + 1
            const ano = dataAtual.getFullYear()

            const res = await fetch(`http://localhost:3000/transactions/month/${id}?mes=${mes}&ano=${ano}`)
            const data = await res.json()
            setTransacoesData(data)
        }
        fetchTransacoes()

    }, [])

    useEffect(() => {
        const transacoesCrescentes = [...transacoesData].sort(
            (a, b) => Number(b.valor) - Number(a.valor)
        )
        setMaioresTransacoes(transacoesCrescentes.splice(0, 3))
    }, [transacoesData])

    //metas para a parte do "Para onde seu dinheiro foi"
    const [metasAtivas, setMetasAtivas] = useState([])

    useEffect(() => {
        
        async function fetchDataMetasAtuais() {
            const res = await fetch(`http://localhost:3000/goals/active/${id}`)
            const data = await res.json()

            setMetasAtivas(data)
        }
        fetchDataMetasAtuais()
    }, [])

    

    function formatarTipoMaiusculo(string) {
      if (!string) { return "" }
      return string.charAt(0).toUpperCase() + string.slice(1)
    }
    
    if(emptyDashboard === "true") { //retorna tela vazia se não houver categorias ou metas criadas
        return (
            <div className="flex flex-col">
                <div className="flex flex-row h-[90vh]">
                    <div className="w-[15%]">
                        <Sidebar selected="dashboard"/>
                    </div>
                    <div className="font-lato-bold flex flex-col text-text-theme w-[85%] bg-theme-bg">
                        <Header text={`Bom dia, ${user}`}/>
                         <div className="font-lato-bold flex flex-col text-black">
                            <span className="self-start ml-8 text-lg mt-12">Dashboard</span>
                            <span className="self-start ml-8 text-2xl mt-12">Você não possui despesas!</span>
                            <img src="\src\assets\undraw_processing.svg" alt="processing_icon" className="w-[50%] h-[50%] mx-auto"/>
                            <div className="fixed top-[60%]">
                                <span className="self-start ml-8 text-2xl mt-4">Clique aqui e crie uma categoria e uma despesa!</span>
                                <img src="\src\assets\Arrow.svg" alt="Seta apontando para botão à esquerda" className="ml-8 w-36 h-18"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <Footer/>
                </div>
            </div>
        )
    }
    else {
        return(
            <div className="flex flex-col">
                <div className="flex flex-row h-[90vh]">
                    <div className="w-[15%]">
                        <Sidebar selected="dashboard"/>
                    </div>
                    <div className="font-lato-bold flex flex-col text-text-theme w-[85%] bg-theme-bg">
                        <Header text={`${msgHora}, ${user}`}/>
                        <div className="flex flex-row h-[100%]">
                            <div className="flex flex-col w-[60%] min-w-[700px]">
                                <span className="self-start ml-8 text-lg mt-12">Dashboard</span>
                                <div className="grid grid-cols-2 place-content-between w-[100%] h-[40%] gap-4 p-5">
                                    <div className={classeCards}>
                                        <div className="flex flex-col p-2 gap-6">
                                            <span className="font-lato-regular text-start">Saldo</span>
                                            <span className="text-xl text-left">{saldo}</span>
                                        </div>
                                        <img src="\src\assets\Icone Saldo.svg" alt="ícone saldo" className="p-4" />
                                    </div>
                                    <div className={classeCards}>
                                        <div className="flex flex-col p-2 gap-6">
                                            <span className="font-lato-regular text-start">Despesas</span>
                                            <span className="text-xl text-left">{despesas}</span>
                                        </div>
                                        <img src="\src\assets\Icone Despesas.svg" alt="ícone despesas" className="p-4" />
                                    </div>
                                    <div className={classeCards}>
                                        <div className="flex flex-col p-2 gap-6">
                                            <span className="font-lato-regular text-start">Cartão de Crédito</span>
                                            <span className="text-xl text-left">{cartao}</span>
                                        </div>
                                        <img src="\src\assets\Icone Cartão.svg" alt="ícone cartão crédito" className="p-4" />
                                    </div>
                                    <div className={classeCards}>
                                        <div className="flex flex-col p-2 gap-6">
                                            <span className="font-lato-regular text-start">Próximos Gastos</span>
                                            <span className="text-xl text-left">{faturaMes}</span>
                                        </div>
                                        <img src="\src\assets\Icone Prox.svg" alt="ícone próximos gastos" className="p-4" />
                                    </div>
                                </div>
                                <div className="flex flex-col ml-8 mt-4">
                                    <span className="text-start text-lg mb-5">Para onde seu dinheiro foi?</span>
                                    <div className="flex flex-col gap-5 overflow-y-scroll max-h-60">
                                        {maioresTransacoes.map((transacao) => {
                                            return (
                                                <div className="justify-between grid grid-cols-3 items-center mb-2 font-lato-regular">
                                                    <span className="text-md text-start font-lato-regular">{transacao.titulo}</span>
                                                    <span className="text-md text-center font-lato-regular">{formatarTipoMaiusculo(transacao.tipo)}</span>
                                                    <span className="text-md text-end font-lato-regular">{formatarValor(transacao.valor)}</span>
                                                </div>
                                            )
                                        })}
                                        {metasAtivas.map((meta) => {
                                            return(
                                                <div>
                                                    <div className="flex justify-between items-center mb-2 font-lato-regular">
                                                        <span className="text-md text-start">{meta.nome}</span>
                                                        <span className="text-md text-end">{meta.valor_atual} / {formatarValor(meta.valor_meta)}</span>
                                                    </div>
                                                    <progress value={meta.valor_atual / meta.valor_meta} className="h-3 w-full rounded-full overflow-hidden appearance-none bg-theme-light
                                                        [&::-webkit-progress-bar]:bg-theme-light [&::-webkit-progress-value]:bg-receita-highlight
                                                        [&::-moz-progress-bar]:bg-receita-highlight" />
                                                </div>
                                            )
                                        })}                                            
                                    </div>
                                </div>
                            </div>
                            <div className="w-[40%] flex flex-col justify-evenly text-black">
                                <MUICalendar/>
                                <div className="bg-theme-light w-80 h-85 mx-auto rounded-3xl p-5">
                                    <div className="h-5 flex justify-evenly">
                                        <div className="flex flex-row gap-2 items-center p-2">
                                            <p className="bg-receita-button-active h-4 w-4 border"></p>
                                            <span>Receitas</span>
                                        </div>
                                        <div className="flex flex-row gap-2 items-center p-2">
                                            <p className="bg-despesa-button-active h-4 w-4 border"></p>
                                            <span>Despesas</span>
                                        </div>
                                    </div>
                                    <div className="h-70 flex justify-center">
                                        <MUIDonutChart valorReceitas={Number(muiChartReceitas)} valorDespesas={Number(muiChartDespesas)}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div><Footer/></div>
            </div>
        )
    }
}