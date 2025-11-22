import { createContext, useState } from "react"

export const AuthContext = createContext()
  
export default function UserContext({children}) {

  //fazer um fetch user por Id talvez? Precisaria definir os valores no login ou cadastro e setar aq
  const [user, setUser] = useState(undefined)
  const [id, setId] = useState(0)
  const [email, setEmail] = useState(undefined)
  const [userPfp, setUserPfp] = useState("src/assets/Foto de Perfil Padrão.svg")
  
  return(
    <AuthContext.Provider value={{user, setUser, id, setId, email, setEmail, userPfp, setUserPfp}}>
      {children}
    </AuthContext.Provider>
  )

  /////////////Transacoes
import { useState, useMemo, useEffect, useContext } from 'react';
import {
    HiOutlineUserCircle,
    HiChevronDown,
    HiOutlineArrowCircleUp,
    HiOutlineArrowCircleDown,
    HiOutlineScale,
    HiChevronLeft,
    HiChevronRight,
    HiOutlineClock,
} from 'react-icons/hi';

// Mock do AuthContext para testes
const AuthContext = React.createContext({
    user: "AAAAAA",
    id: 17,
    email: "e@mail.com",
    userPfp: "src/assets/Foto de Perfil Padrão.svg"
});

// Mock de componentes
const Sidebar = ({ selected }) => <div className="bg-gray-100 p-4">Sidebar - {selected}</div>;
const Footer = () => <div className="bg-gray-100 p-4 text-center">Footer</div>;
const CategoryIcon = ({ icon, color, size }) => (
    <div style={{ color, width: size, height: size }} className="font-bold">
        {icon?.charAt(0).toUpperCase() || '📊'}
    </div>
);

export default function Transacoes() {
    // Context
    const { user, id } = useContext(AuthContext);

    // Estados
    const [currentDate, setCurrentDate] = useState(new Date());
    const [showMonthPicker, setShowMonthPicker] = useState(false);
    const [transacoesData, setTransacoesData] = useState([]);

    // Buscar transações do backend - Implementado ao padrão de Investimentos
    useEffect(() => {
        async function fetchTransacoes() {
            const mes = currentDate.getMonth() + 1;
            const ano = currentDate.getFullYear();
            
            const res = await fetch(
                `http://localhost:3000/transactions/month/${id}?mes=${mes}&ano=${ano}`
            );
            const data = await res.json();

            setTransacoesData(data);
        }

        fetchTransacoes();
    });

    // Navegação de mês
    const previousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    const formatDate = (date) => {
        const months = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        return `${months[date.getMonth()]}, ${date.getFullYear()}`;
    };

    const months = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 8 }, (_, i) => currentYear - 5 + i);

    const selectMonthYear = (month, year) => {
        setCurrentDate(new Date(year, month));
        setShowMonthPicker(false);
    };

    // Calcular totais
    const totais = useMemo(() => {
        const receitas = transacoesData
            .filter(t => t.tipo === 'receita')
            .reduce((sum, t) => sum + parseFloat(t.valor), 0);

        const despesas = transacoesData
            .filter(t => t.tipo === 'despesa')
            .reduce((sum, t) => sum + parseFloat(t.valor), 0);

        const balanco = receitas - despesas;

        return {
            receitas,
            despesas,
            balanco,
            transacoes: transacoesData
        };
    }, [transacoesData]);

    // Formatar valor em reais
    const formatarValor = (valor) => {
        return parseFloat(valor).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    };

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">
            {/* SIDEBAR - 15% da largura */}
            <div className="w-[15%] h-full flex flex-col bg-white">
                <Sidebar selected="transacoes" />
            </div>

            {/* CONTEÚDO PRINCIPAL - 85% da largura */}
            <div className="w-[85%] h-full flex flex-col">
                {/* Cabeçalho */}
                <header className="flex items-center justify-end p-6 border-b border-gray-200 bg-white">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <HiOutlineUserCircle size={24} className="text-gray-500" />
                        <span>{user}</span>
                    </div>
                </header>

                {/* Conteúdo com scroll */}
                <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
                    {/* Título */}
                    <div className="mb-6 flex items-center gap-2">
                        <button className="bg-white rounded-full px-6 py-2 flex items-center gap-4 hover:bg-gray-100 transition-colors shadow-sm border border-gray-200">
                            <h1 className="text-2xl font-bold text-gray-800">Transações</h1>
                            <HiChevronDown size={32} className="text-gray-700" />
                        </button>
                    </div>

                    {/* Cartões de Estatísticas */}
                    <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3 max-w-6xl mx-auto">
                        {/* Card 1: Receita */}
                        <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
                            <div className="rounded-full p-3 bg-green-100 text-green-600">
                                <HiOutlineArrowCircleUp size={24} />
                            </div>
                            <div>
                                <span className="text-sm text-gray-500">Receita</span>
                                <p className="text-2xl font-semibold text-gray-800">{formatarValor(totais.receitas)}</p>
                            </div>
                        </div>

                        {/* Card 2: Despesas */}
                        <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
                            <div className="rounded-full p-3 bg-red-100 text-red-600">
                                <HiOutlineArrowCircleDown size={24} />
                            </div>
                            <div>
                                <span className="text-sm text-gray-500">Despesas Mensal</span>
                                <p className="text-2xl font-semibold text-gray-800">{formatarValor(totais.despesas)}</p>
                            </div>
                        </div>

                        {/* Card 3: Balanço */}
                        <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
                            <div className={`rounded-full p-3 ${totais.balanco >= 0 ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'}`}>
                                <HiOutlineScale size={24} />
                            </div>
                            <div>
                                <span className="text-sm text-gray-500">Balanço Geral</span>
                                <p className={`text-2xl font-semibold ${totais.balanco >= 0 ? 'text-gray-800' : 'text-red-600'}`}>
                                    {formatarValor(totais.balanco)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Seletor de Data */}
                    <div className="mb-6 flex items-center justify-center gap-4 relative">
                        <button
                            onClick={previousMonth}
                            className="rounded-full p-2 text-gray-500 hover:bg-gray-200 transition-colors"
                        >
                            <HiChevronLeft size={20} />
                        </button>

                        <button
                            onClick={() => setShowMonthPicker(!showMonthPicker)}
                            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 min-w-[180px] text-center hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 bg-white"
                        >
                            {formatDate(currentDate)}
                            <HiChevronDown size={16} className={`transition-transform ${showMonthPicker ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown de Mês/Ano */}
                        {showMonthPicker && (
                            <>
                                <div
                                    className="fixed inset-0 z-10"
                                    onClick={() => setShowMonthPicker(false)}
                                />

                                <div className="absolute top-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-20 w-80">
                                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Selecione o período</h3>

                                    <div className="mb-4">
                                        <p className="text-xs text-gray-500 mb-2">Ano</p>
                                        <div className="grid grid-cols-4 gap-2">
                                            {years.map(year => (
                                                <button
                                                    key={year}
                                                    onClick={() => selectMonthYear(currentDate.getMonth(), year)}
                                                    className={`px-3 py-2 rounded-md text-sm transition-colors ${
                                                        year === currentDate.getFullYear()
                                                            ? 'bg-blue-600 text-white'
                                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    }`}
                                                >
                                                    {year}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-500 mb-2">Mês</p>
                                        <div className="grid grid-cols-3 gap-2">
                                            {months.map((month, index) => (
                                                <button
                                                    key={month}
                                                    onClick={() => selectMonthYear(index, currentDate.getFullYear())}
                                                    className={`px-3 py-2 rounded-md text-sm transition-colors ${
                                                        index === currentDate.getMonth()
                                                            ? 'bg-blue-600 text-white'
                                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    }`}
                                                >
                                                    {month.substring(0, 3)}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => {
                                            setCurrentDate(new Date());
                                            setShowMonthPicker(false);
                                        }}
                                        className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                                    >
                                        Hoje
                                    </button>
                                </div>
                            </>
                        )}

                        <button
                            onClick={nextMonth}
                            className="rounded-full p-2 text-gray-500 hover:bg-gray-200 transition-colors"
                        >
                            <HiChevronRight size={20} />
                        </button>
                    </div>

                    {/* Tabela de Transações */}
                    <div className="rounded-xl bg-white p-6 max-w-6xl mx-auto mb-6 shadow-sm border border-gray-200">
                        {/* Cabeçalho da Tabela */}
                        <div className="mb-4 grid grid-cols-4 gap-4 px-4 pb-3 border-b border-gray-200">
                            <span className="text-sm font-semibold text-gray-600">Categoria</span>
                            <span className="text-sm font-semibold text-gray-600">Transferência</span>
                            <span className="flex items-center gap-1 text-sm font-semibold text-gray-600">
                                <HiOutlineClock size={16} /> Data
                            </span>
                            <span className="text-sm font-semibold text-gray-600">Valor</span>
                        </div>

                        {/* Lista de Transações */}
                        {totais.transacoes.length > 0 ? (
                            <div className="space-y-2">
                                {totais.transacoes.map(transacao => (
                                    <div
                                        key={transacao.id}
                                        className="grid grid-cols-4 gap-4 px-4 py-4 bg-gray-50 rounded-lg items-center hover:bg-gray-100 transition-colors cursor-pointer"
                                    >
                                        {/* Categoria */}
                                        <div className="flex items-center gap-3">
                                            <CategoryIcon
                                                icon={transacao.iconCategoria}
                                                color={transacao.corCategoria}
                                                size={20}
                                            />
                                            <span className="font-medium text-gray-800">
                                                {transacao.categoria}
                                            </span>
                                        </div>

                                        {/* Transferência */}
                                        <span className={`font-medium ${
                                            transacao.transferencia === 'Sucesso'
                                                ? 'text-green-600'
                                                : 'text-yellow-600'
                                        }`}>
                                            {transacao.transferencia}
                                        </span>

                                        {/* Data */}
                                        <span className="text-gray-600">
                                            {transacao.data}
                                        </span>

                                        {/* Valor */}
                                        <span className={`font-semibold ${
                                            transacao.tipo === 'receita'
                                                ? 'text-green-600'
                                                : 'text-gray-800'
                                        }`}>
                                            {formatarValor(transacao.valor)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 py-16 text-center">
                                <div className="w-32 h-32 mb-4 text-gray-300">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z" />
                                    </svg>
                                </div>
                                <p className="font-medium text-gray-500 text-lg">Nenhuma transação neste período</p>
                                <p className="text-gray-400 text-sm mt-1">Selecione outro mês ou adicione transações</p>
                            </div>
                        )}
                    </div>
                </main>

                {/* FOOTER */}
                <Footer />
            </div>
        </div>
    );
}