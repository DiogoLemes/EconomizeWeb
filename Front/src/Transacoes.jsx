import Footer from "./Components/Footer"
import Sidebar from "./Components/Sidebar"
import Header from "./Components/Header"
import { useContext } from "react"
import {AuthContext} from "./UserContext"
import { useState, useMemo, useEffect } from 'react'
import {ThemeSetter} from "./Functions/ThemeSetter"
import {HomeRedirect} from "./Functions/HomeRedirect"


//COISAS PRA ARRUMAR:
//- código se precisar
//- fetch do backend certinho
//- package-lock.json


export default function Transacoes() {

    const {user, setUser, id, setId, email, setEmail, userPfp, setUserPfp} = useContext(AuthContext)
    
    const loggedInUsername = sessionStorage.getItem("loggedUsername")
    //setUser(loggedInUsername) //Bad State Call
    setUser("nome teste")

    HomeRedirect()
    ThemeSetter()

    const classeCards = "bg-white-div rounded-2xl border-theme-light border-1 shadow-md h-[6em] w-[20em] flex flex-row justify-between"

    const [dataAtual, setDataAtual] = useState(new Date())
    const [displayMeses, setDisplayMeses] = useState(false)
    const [transacoesData, setTransacoesData] = useState([])

    const [saldo, setSaldo] = useState(0)
    const [despesas, setDespesas] = useState(0)

    //Busca transações do mês selecionado
    useEffect(() => {
        async function fetchTransacoes() {
            if (!id) return

            const mes = dataAtual.getMonth() + 1
            const ano = dataAtual.getFullYear()

            // `http://localhost:3000/transactions/month/${id}?mes=${mes}&ano=${ano}`,
            const res = await fetch(`http://localhost:3000/transactions/month/17?mes=11&ano=2025`)
            const data = await res.json()
            setTransacoesData(data)
            console.log("Transações carregadas:", data)
        }
        fetchTransacoes()
    }, [dataAtual])

    useEffect(() => {
        async function fetchSaldo() {

            const res = await fetch(`http://localhost:3000/dashboard/${id}/saldo`)
            const data = await res.json()
            console.log("data saldo = ", data)

            let saldoValor = data.saldo ?? "Erro" //mostra Erro caso não consiga carregar
            if(saldoValor == data.saldo)
            {
                saldoValor = Number(saldoValor)
            } 
            else 
            {
                saldoValor = "Erro"
            }

            const saldoFinal = saldoValor.toLocaleString("pt-BR", {             //Intl ou toLocaleString?
            style: "currency",
            currency: "BRL",
            })

            setSaldo(saldoFinal)
        }

        async function fetchDespesas() {
            const res = await fetch(`http://localhost:3000/dashboard/${id}/despesa`)
            const data = await res.json()
            console.log("data despesas = ", data)

            let despesaValor = data.despesa ?? "Erro"
            if(despesaValor == data.despesa)
            {
                despesaValor = Number(despesaValor)
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

    // // Navegação de mês
    const changeMonth = (monthOffset) => {
        setDataAtual(new Date(dataAtual.getFullYear(), dataAtual.getMonth() + monthOffset))
    }
    
    const meses = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ]

    const formatarData = (data) => {
        return `${meses[data.getMonth()]}, ${data.getFullYear()}`
    }

    const anoAtual = new Date().getFullYear()
    const periodoAnos = Array.from({ length: 8 }, (_, i) => anoAtual - 5 + i)

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
                                    <span className="text-xl text-left">{formatarValor(999)}</span>
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
                                    <div className="fixed inset-0 z-10" onClick={() => setDisplayMeses(false)}></div>
                                    <div className="absolute top-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-20 w-80">
                                        <h3 className="text-sm font-lato-bold text-gray-700 mb-3">Selecione o período</h3>
                                        <div className="mb-4">
                                            <p className="text-xs text-black mb-2">Ano</p>
                                            <div className="grid grid-cols-4 gap-2">
                                                {periodoAnos.map(year => (
                                                    <button
                                                        key={year}
                                                        onClick={() => selectMonthYear(dataAtual.getMonth(), year)}
                                                        className={`px-3 py-2 rounded-md text-sm ${
                                                            year === dataAtual.getFullYear()
                                                                ? 'bg-blue-600 text-white'
                                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                        }`}>
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
                            <div className="mb-4 grid grid-cols-5 gap-4 px-4 pb-3">
                                <span className="text-2xl font-lato-regular  text-black">Categoria</span>
                                <span className="text-2xl font-lato-regular  text-black">Tipo</span>
                                <span className="text-2xl font-lato-regular  text-black">Transferência</span>
                                <span className="text-2xl font-lato-regular  text-black">Data</span>
                                <span className="text-2xl font-lato-regular  text-black">Valor</span>
                            </div>
                            {transacoesData.length > 0 ? (
                            <div className="space-y-2">
                                <p>AAAAAAAAAA</p>
                            </div>
                        ) : (
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

{/* Lista de Transações */}
// {totais.transacoes.length > 0 ? (
//                             <div className="space-y-2">
//                                 {totais.transacoes.map(transacao => (
//                                     <div key={transacao.id} className="grid grid-cols-4 gap-4 px-4 py-4 bg-gray-50 rounded-lg items-center hover:bg-gray-100 cursor-pointer">
//                                         <div className="flex items-center gap-3">
//                                             <CategoryIcon icon={transacao.iconCategoria} size={20}/>
//                                             <span className="font-lato-regular text-gray-800"> {transacao.categoria} </span>
//                                         </div>
//                                         <span className={"font-lato-regular text-black"}>{transacao.transferencia}</span>
//                                         <span className="text-black">{transacao.data}</span>
//                                         <span className={"font-lato-bold text-black"}> {formatarValor(transacao.valor)} </span>
//                                     </div>
//                                 ))}
//                             </div>
//                         ) : (
//                             <div className="flex flex-col">
//                                 <img src="Front\src\assets\undraw_processing.svg" className="w-20 h-20"/>
//                                 <p>Nenhum Resultado</p>
//                             </div>
//                             )
//                         }