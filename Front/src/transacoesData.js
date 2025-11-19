// Dados simulados do BD - você substituirá isso pela sua API depois
export const transacoesData = [
    {
        id: 1,
        categoria: "Casa",
        iconCategoria: "home",
        corCategoria: "#EF4444", // vermelho
        transferencia: "Sucesso",
        data: "27/10/2025",
        valor: 540.00,
        tipo: "despesa"
    },
    {
        id: 2,
        categoria: "Supermercado",
        iconCategoria: "shopping",
        corCategoria: "#EC4899", // rosa
        transferencia: "Sucesso",
        data: "27/10/2025",
        valor: 540.00,
        tipo: "despesa"
    },
    {
        id: 3,
        categoria: "Transporte",
        iconCategoria: "car",
        corCategoria: "#10B981", // verde
        transferencia: "Sucesso",
        data: "27/10/2025",
        valor: 540.00,
        tipo: "despesa"
    },
    {
        id: 4,
        categoria: "Salário",
        iconCategoria: "money",
        corCategoria: "#10B981", // verde
        transferencia: "Sucesso",
        data: "05/10/2025",
        valor: 5000.00,
        tipo: "receita"
    },
    {
        id: 5,
        categoria: "Freelance",
        iconCategoria: "briefcase",
        corCategoria: "#3B82F6", // azul
        transferencia: "Pendente",
        data: "15/10/2025",
        valor: 1200.00,
        tipo: "receita"
    },
    {
        id: 6,
        categoria: "Aluguel",
        iconCategoria: "home",
        corCategoria: "#EF4444",
        transferencia: "Sucesso",
        data: "01/11/2025",
        valor: 1500.00,
        tipo: "despesa"
    },
    {
        id: 7,
        categoria: "Academia",
        iconCategoria: "health",
        corCategoria: "#F59E0B",
        transferencia: "Sucesso",
        data: "10/11/2025",
        valor: 150.00,
        tipo: "despesa"
    }
];

// Função para calcular totais
export const calcularTotais = (transacoes, mes, ano) => {
    const transacoesFiltradas = transacoes.filter(t => {
        const [dia, mesT, anoT] = t.data.split('/');
        return parseInt(mesT) === mes + 1 && parseInt(anoT) === ano;
    });

    const receitas = transacoesFiltradas
        .filter(t => t.tipo === "receita")
        .reduce((acc, t) => acc + t.valor, 0);

    const despesas = transacoesFiltradas
        .filter(t => t.tipo === "despesa")
        .reduce((acc, t) => acc + t.valor, 0);

    const balanco = receitas - despesas;

    return {
        receitas,
        despesas,
        balanco,
        transacoes: transacoesFiltradas
    };
};