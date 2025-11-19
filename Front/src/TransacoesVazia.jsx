// Integrar essa tela vazia na tela tela de transações em si, porque o que muda é o saldo, despesa e balanço. E quando não há transações aparece a imagem. Sei que tem dados os não puxando do backend Valores, Sem valores não tem transações se não tem transações tela vazia. 
import Footer from "./Footer.jsx";
import Sidebar from "./Sidebar.jsx";
import { useState } from 'react';
import {
    HiOutlineUserCircle,
    HiChevronDown,
    HiOutlineArrowCircleUp,
    HiOutlineArrowCircleDown,
    HiOutlineScale,
    HiChevronLeft,
    HiChevronRight,
    HiOutlineClock,
    HiOutlineDocumentSearch,
} from 'react-icons/hi';

export default function Transacoes() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [showMonthPicker, setShowMonthPicker] = useState(false);

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

    // Lista de meses
    const months = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    // Gerar lista de anos (últimos 5 anos + próximos 2 anos)
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 8 }, (_, i) => currentYear - 5 + i);

    // Função para selecionar mês/ano
    const selectMonthYear = (month, year) => {
        setCurrentDate(new Date(year, month));
        setShowMonthPicker(false);
    };

    return (
        <div className="flex h-screen overflow-hidden">

            {/* SIDEBAR - 15% da largura, altura 100% da tela */}
            <div className="w-[15%] h-full flex flex-col">
                <Sidebar selected="transacoes" />
            </div>

            {/* CONTEÚDO PRINCIPAL - 85% da largura */}
            <div className="w-[85%] h-full flex flex-col overflow-y-auto">

                {/* Cabeçalho */}
                <header className="flex items-center justify-end p-6 border-b border-gray-200 bg-white">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-700 font-lato-regular">
                        <HiOutlineUserCircle size={24} className="text-gray-500" />
                        <span>Nome Usuário</span>
                    </div>
                </header>

                {/* Conteúdo (Cards, Tabela) - com scroll */}
                <main className="flex-1 p-6 font-lato-regular bg-white overflow-y-auto">

                    {/* Título */}
                    <div className="mb-6 flex items-center gap-2">
                        <button className="bg-gray-200 rounded-full px-6 py-2 flex items-center gap-4 hover:bg-gray-250 transition-colors shadow-sm">
                            <h1 className="text-2xl font-bold text-gray-800 font-lato-bold">Transações</h1>
                            <HiChevronDown size={32} className="text-gray-700" />
                        </button>
                    </div>

                    {/* Cartões de Estatísticas - CENTRALIZADOS */}
                    <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3 max-w-6xl mx-auto">
                        {/* Card 1: Receita */}
                        <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                            <div className="rounded-full p-3 bg-green-100 text-green-600">
                                <HiOutlineArrowCircleUp size={24} />
                            </div>
                            <div>
                                <span className="text-sm text-gray-500">Receita &gt;</span>
                                <p className="text-2xl font-semibold text-gray-800">R$ 00,00</p>
                            </div>
                        </div>
                        {/* Card 2: Despesas */}
                        <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                            <div className="rounded-full p-3 bg-red-100 text-red-600">
                                <HiOutlineArrowCircleDown size={24} />
                            </div>
                            <div>
                                <span className="text-sm text-gray-500">Despesas Mensal &gt;</span>
                                <p className="text-2xl font-semibold text-gray-800">R$ 00,00</p>
                            </div>
                        </div>
                        {/* Card 3: Balanço */}
                        <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                            <div className="rounded-full p-3 bg-orange-100 text-orange-600">
                                <HiOutlineScale size={24} />
                            </div>
                            <div>
                                <span className="text-sm text-gray-500">Balanço Geral &gt;</span>
                                <p className="text-2xl font-semibold text-gray-800">R$ 00,00</p>
                            </div>
                        </div>
                    </div>

                    {/* Seletor de Data com Dropdown */}
                    <div className="mb-6 flex items-center justify-center gap-4 relative">
                        <button
                            onClick={previousMonth}
                            className="rounded-full p-2 text-gray-500 hover:bg-gray-100 transition-colors"
                        >
                            <HiChevronLeft size={20} />
                        </button>

                        {/* Botão do Mês/Ano - Clicável */}
                        <button
                            onClick={() => setShowMonthPicker(!showMonthPicker)}
                            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 min-w-[150px] text-center hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                        >
                            {formatDate(currentDate)}
                            <HiChevronDown size={16} className={`transition-transform ${showMonthPicker ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown de Mês/Ano */}
                        {showMonthPicker && (
                            <>
                                {/* Overlay para fechar ao clicar fora */}
                                <div
                                    className="fixed inset-0 z-10"
                                    onClick={() => setShowMonthPicker(false)}
                                />

                                {/* Painel do Picker */}
                                <div className="absolute top-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-20 w-80">
                                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Selecione o período</h3>

                                    {/* Grid de Anos */}
                                    <div className="mb-4">
                                        <p className="text-xs text-gray-500 mb-2">Ano</p>
                                        <div className="grid grid-cols-4 gap-2">
                                            {years.map(year => (
                                                <button
                                                    key={year}
                                                    onClick={() => selectMonthYear(currentDate.getMonth(), year)}
                                                    className={`px-3 py-2 rounded-md text-sm transition-colors ${year === currentDate.getFullYear()
                                                            ? 'bg-sidebar-selected-text text-white'
                                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                        }`}
                                                >
                                                    {year}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Grid de Meses */}
                                    <div>
                                        <p className="text-xs text-gray-500 mb-2">Mês</p>
                                        <div className="grid grid-cols-3 gap-2">
                                            {months.map((month, index) => (
                                                <button
                                                    key={month}
                                                    onClick={() => selectMonthYear(index, currentDate.getFullYear())}
                                                    className={`px-3 py-2 rounded-md text-sm transition-colors ${index === currentDate.getMonth() && currentDate.getFullYear() === new Date().getFullYear()
                                                            ? 'bg-sidebar-selected-text text-white'
                                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                        }`}
                                                >
                                                    {month.substring(0, 3)}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Botão Hoje */}
                                    <button
                                        onClick={() => {
                                            setCurrentDate(new Date());
                                            setShowMonthPicker(false);
                                        }}
                                        className="w-full mt-4 px-4 py-2 bg-sidebar-selected-text text-white rounded-md text-sm font-medium hover:bg-opacity-90 transition-colors"
                                    >
                                        Hoje
                                    </button>
                                </div>
                            </>
                        )}

                        <button
                            onClick={nextMonth}
                            className="rounded-full p-2 text-gray-500 hover:bg-gray-100 transition-colors"
                        >
                            <HiChevronRight size={20} />
                        </button>
                    </div>

                    {/* Tabela Vazia */}
                    <div className="rounded-xl bg-gray-50 p-6 max-w-6xl mx-auto mb-6">
                        {/* Cabeçalho da Tabela */}
                        <div className="mb-4 grid grid-cols-4 gap-4 px-4">
                            <span className="text-sm font-semibold text-gray-500">Categoria</span>
                            <span className="text-sm font-semibold text-gray-500">Transferência</span>
                            <span className="flex items-center gap-1 text-sm font-semibold text-gray-500">
                                <HiOutlineClock size={16} /> Data
                            </span>
                            <span className="text-sm font-semibold text-gray-500">Valor</span>
                        </div>
                        {/* Corpo Vazio */}
                        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 py-24 text-center">
                            <img
                                src="/undraw_processing_bto8.svg"
                                alt="Nenhum resultado encontrado"
                                className="w-48 h-48 mb-4"
                            />
                            <p className="font-medium text-gray-500">Nenhum Resultado</p>
                        </div>
                    </div>
                </main>

                {/* FOOTER - fixo na parte de baixo */}
                <Footer />
            </div>
        </div>
    )
}