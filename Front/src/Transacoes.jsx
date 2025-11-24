import Footer from "./Components/Footer"
import Sidebar from "./Components/Sidebar"
import Header from "./Components/Header"
import { useContext } from "react"
import {AuthContext} from "./UserContext"
import { useState, useEffect } from 'react'
import {ThemeSetter} from "./Functions/ThemeSetter"
import {HomeRedirect} from "./Functions/HomeRedirect"

export default function Transacoes() {

    const {user, setUser, id, setId, email, setEmail, userPfp, setUserPfp} = useContext(AuthContext)
    
    const loggedInUsername = sessionStorage.getItem("loggedUsername")
    setUser(loggedInUsername)

    HomeRedirect()
    ThemeSetter()

    const classeCards = "bg-white-div rounded-2xl border-theme-light border-1 shadow-md h-[6em] w-[20em] flex flex-row justify-between"
    const classeTabelaCategorias = "text-2xl font-lato-regular text-black"
    const classeTabelaTransacoes = "font-lato-regular text-black text-lg"

    const [dataAtual, setDataAtual] = useState(new Date())
    const [displayMeses, setDisplayMeses] = useState(false)
    const [transacoesData, setTransacoesData] = useState([])
    const [categoriesData, setCategoriesData] = useState([])
    
    const [saldo, setSaldo] = useState(0)
    const [despesas, setDespesas] = useState(0)
    const [saldoNum, setSaldoNum] = useState(0)
    const [despesaNum, setDespesaNum] = useState(0)
    const [balanco, setBalanco] = useState(0)
    
    const meses = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ]
    
    //Busca transações do mês selecionado
    useEffect(() => {
        async function fetchTransacoes() {
            if (!id) return

            const mes = dataAtual.getMonth() + 1
            const ano = dataAtual.getFullYear()

            const res = await fetch(`http://localhost:3000/transactions/month/${id}?mes=${mes}&ano=${ano}`)
            const data = await res.json()
            setTransacoesData(data)
        }

        async function fetchCategorias() {
            const res = await fetch(`http://localhost:3000/categories/${id}`)
            const data = await res.json()
            setCategoriesData(data)
        }

        fetchTransacoes()
        fetchCategorias()
    }, [dataAtual])

    //busca dados dos cards
    useEffect(() => {
        async function fetchSaldo() {

            const res = await fetch(`http://localhost:3000/dashboard/${id}/saldo`)
            const data = await res.json()

            let saldoValor = data.saldo ?? "Erro" //mostra Erro caso não consiga carregar
            if(saldoValor == data.saldo)
            {
                saldoValor = Number(saldoValor)
                setSaldoNum(saldoValor)
            } 
            else 
            {
                saldoValor = "Erro"
            }
            const saldoFinal = saldoValor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
            })
            setSaldo(saldoFinal)
        }

        async function fetchDespesas() {
            const res = await fetch(`http://localhost:3000/dashboard/${id}/despesa`)
            const data = await res.json()

            let despesaValor = data.despesa ?? "Erro"
            if(despesaValor == data.despesa)
            {
                despesaValor = Number(despesaValor)
                setDespesaNum(Number(despesaValor))
            }
            else 
            {
                despesaValor = "Erro"
            }
            const despesaFinal = despesaValor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
            })
            setDespesas(despesaFinal)
        }

        fetchSaldo()
        fetchDespesas()
    }, [])

    useEffect(() => {
        setBalanco(saldoNum - despesaNum)
    }, [saldoNum, despesaNum])

    const changeMonth = (monthOffset) => {
        setDataAtual(new Date(dataAtual.getFullYear(), dataAtual.getMonth() + monthOffset))
    }
    
    const formatarData = (data) => {
        return `${meses[data.getMonth()]}, ${data.getFullYear()}`
    }

    function trocarCategoriaIdNome(transacaoId){
        for(let i = 0; i < categoriesData.length; i++){
            if(transacaoId == categoriesData[i].id) {
                
                return String(categoriesData[i].nome)
            }
        }
    }

    const anoAtual = new Date().getFullYear()
    const periodoAnos = Array.from({ length: 8 }, (_, i) => anoAtual - 5 + i) //pega periodo de 5 anos atrás até 2 anos futuros

    const selectMonthYear = (month, year) => {
        setDataAtual(new Date(year, month))
        setDisplayMeses(false)
    }

    const formatarValor = (valor) => {
        return parseFloat(valor).toLocaleString('pt-BR', { 
            style: 'currency', 
            currency: 'BRL' 
        })
    }

    function formatarTipoMaiusculo(string) {
      if (!string) return ""
      return string.charAt(0).toUpperCase() + string.slice(1)
    }

    return (
        <div className="flex flex-col">
            <div className="flex flex-row h-[90vh]">
                <div className="w-[15%]">
                    <Sidebar selected="transacoes" />
                </div>
                <div className="flex flex-col w-[85%] bg-theme-bg text-text-theme">
                    <div className="font-lato-bold flex flex-col">
                        <Header text={"Transações"}/>
                        <div className="flex flex-row justify-around w-[80%] mt-20 mb-10 mx-auto">
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
                                    <span className="font-lato-regular text-start">Balanço Geral</span>
                                    <span className="text-xl text-left">{formatarValor(balanco)}</span> 
                                    {/* arrumar isso aq ainda               ^^^^^^ */}
                                </div>
                                <img src="\src\assets\Icone Cartão.svg" alt="ícone cartão crédito" className="p-4" />
                            </div>
                        </div>
                        <div className="mb-6 flex flex-row items-center justify-center gap-4">
                            <button onClick={() => changeMonth(-1)} className="rounded-full p-2 text-black hover:bg-gray-200">
                                <img alt="seta esquerda" src="\src\assets\seta_esquerda_transicao.svg" className="w-5 h-5"/>
                            </button>
                            <button  onClick={() => setDisplayMeses(true)} className="rounded-lg border border-[#433BFF] px-4 py-2 text-sm font-lato-bold text-black min-w-[180px] text-center hover:bg-gray-50 flex items-center justify-center gap-2 bg-white" >
                                {formatarData(dataAtual)}
                            </button>
                            {displayMeses && (
                                <div >
                                    <div className="fixed inset-0 z-1" onClick={() => setDisplayMeses(false)}></div>
                                    <div className="absolute top-[35%] left-[50%] mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-20 w-80">
                                        <h3 className="text-sm font-lato-bold text-gray-700 mb-3">Selecione o período</h3>
                                        <div className="mb-4">
                                            <p className="text-xs text-black mb-2">Ano</p>
                                            <div className="grid grid-cols-4 gap-2">
                                                {periodoAnos.map(year => (
                                                    <button key={year} onClick={() => selectMonthYear(dataAtual.getMonth(), year)}
                                                        className={`px-3 py-2 rounded-md text-sm ${
                                                            year === dataAtual.getFullYear()
                                                                ? 'bg-blue-600 text-white'
                                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                                                        {year}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-xs text-black mb-2">Mês</p>
                                            <div className="grid grid-cols-3 gap-2">
                                                {meses.map((month, index) => (
                                                    <button
                                                        key={month}
                                                        onClick={() => selectMonthYear(index, dataAtual.getFullYear())}
                                                        className={`px-3 py-2 rounded-md text-sm transition-colors ${
                                                            index === dataAtual.getMonth()
                                                                ? 'bg-blue-600 text-white'
                                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                                                        {month.substring(0, 3)}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <button onClick={() => {
                                            setDataAtual(new Date())
                                            setDisplayMeses(false) }} 
                                            className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-lato-regular hover:bg-blue-700">
                                            Hoje
                                        </button>
                                    </div>
                                </div>
                            )}
                            <button onClick={() => changeMonth(1)} className="rounded-full p-2 text-black hover:bg-gray-200">
                                <img alt="seta direita" src="\src\assets\seta_direita_transicao.svg" className="w-5 h-5"/>
                            </button>
                        </div>
                        {/* Tabela de Transações */}
                        <div className="rounded-xl bg-[#D9D9D9] p-6 mx-auto mb-6 w-[90%] h-100">
                            <div className="mb-4 grid grid-cols-5 gap-4 px-4 pb-3 items-center sticky">
                                <span className={classeTabelaCategorias}>Categoria</span>
                                <span className={classeTabelaCategorias}>Tipo</span>
                                <span className={classeTabelaCategorias}>Nome</span>
                                <span className={classeTabelaCategorias}>Data</span>
                                <span className={classeTabelaCategorias}>Valor</span>
                            </div>
                                {transacoesData.length > 0 ? 
                                    (
                                        <div className="overflow-y-scroll max-h-75 flex flex-col gap-4 px-4">
                                            {transacoesData.map((transacao) => {
                                                return(
                                                    <div key={transacao.id} className="grid grid-cols-5 mb-4 rounded-lg items-center">
                                                        <span className={classeTabelaTransacoes}> {trocarCategoriaIdNome(transacao.categoria_id)} </span>
                                                        <span className={classeTabelaTransacoes}> {formatarTipoMaiusculo(transacao.tipo)} </span>
                                                        <span className={classeTabelaTransacoes}>{transacao.titulo}</span>
                                                        <span className={classeTabelaTransacoes}>{transacao.data_trans.split(",")[0]}</span>
                                                        <span className={classeTabelaTransacoes}> {formatarValor(transacao.valor)} </span>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    ) : 
                                    (
                                        <div className="flex flex-col items-center">
                                            <img src="\src\assets\undraw_processing.svg" className="w-[20%] h-[20%]"/>
                                            <p>Nenhuma Transação Este Mês</p>
                                        </div>
                                    )
                                } 
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}