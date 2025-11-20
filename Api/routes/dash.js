'use strict'
const { getProximasFaturas } = require('../schemas/dashboard/getProximasFaturas')

module.exports = async function (fastify, opts) {
    fastify.get('/:idUsuario/saldo', async function (request, reply) {
        const { idUsuario } = request.params;
        try {
            const usuario = await fastify.prisma.usuarios.findUnique({
                where: { id: Number(idUsuario) },
                select: { saldo: true }
            });
            if (!usuario) {
                return reply.code(404).send({ error: 'Usuário não encontrado.' });
            }
            reply.send({ saldo: usuario.saldo });
        } catch (error) {
            reply.code(500).send({ error: 'Erro ao buscar saldo.' });
        }
    });
    // Pegar o valor total de despesa do usuário
    fastify.get('/:idUsuario/despesa', async function (request, reply) {
        const { idUsuario } = request.params;
        try {
            const usuario = await fastify.prisma.usuarios.findUnique({
                where: { id: Number(idUsuario) },
                select: { despesa: true }
            });
            if (!usuario) return reply.code(404).send({ error: 'Usuário não encontrado.' });

            reply.send({ despesa: usuario.despesa });
        } catch (error) {
            console.error('Erro ao buscar despesa do usuário:', error);
            reply.code(500).send({ error: 'Erro ao buscar despesa.' });
        }
    });

    // Criar transação (receita) e ajustar saldo do usuário
    fastify.post('/:idUsuario/saldo', async function (request, reply) {
        const { idUsuario } = request.params;
        const { titulo, descricao, categoria_id, tipo,valor, data_trans } = request.body || {};

        if (!titulo || valor === undefined || valor === null) {
            return reply.code(400).send({ error: 'Campos obrigatórios: titulo, valor.' });
        }

        const valorNum = Number(valor);
        if (!isFinite(valorNum) || valorNum <= 0) {
            return reply.code(400).send({ error: 'Valor inválido.' });
        }


        const dataTransDate = data_trans ? new Date(data_trans) : new Date();

        try {
  
            const transacao = await fastify.prisma.transacoes.create({
                data: {
                    usuario_id: Number(idUsuario),
                    titulo: String(titulo),
                    descricao: descricao ? String(descricao) : null,
                    categoria_id: categoria_id !== undefined && categoria_id !== null ? Number(categoria_id) : null,
                    valor: valorNum,
                    tipo: String(tipo),
                    status_transferencia: '1',
                    data_trans: dataTransDate,
                    criado_em: dataTransDate
                }
            });

            if (tipo === 'receita') {
                const usuarioAtualizado = await fastify.prisma.usuarios.update({
                    where: { id: Number(idUsuario) },
                    data: { saldo: { increment: valorNum } },
                    select: { id: true, saldo: true }
                });

                const saldoOut = usuarioAtualizado.saldo && usuarioAtualizado.saldo.toString ? usuarioAtualizado.saldo.toString() : usuarioAtualizado.saldo;

                reply.code(201).send({ transacao, saldo: saldoOut });
            } else {
                const usuarioAtualizado = await fastify.prisma.usuarios.update({
                    where: { id: Number(idUsuario) },
                    data: { despesa: { increment: valorNum } },
                    select: { id: true, despesa: true }
                });

                const despesaOut = usuarioAtualizado.despesa && usuarioAtualizado.despesa.toString ? usuarioAtualizado.despesa.toString() : usuarioAtualizado.despesa;

                reply.code(201).send({ transacao, despesa: despesaOut });
            }


        } catch (error) {
            console.error('Erro ao criar transacao (receita):', error);
            reply.code(500).send({ error: 'Erro ao criar transacao.' });
        }
    });

    // Função auxiliar para gerar formatos de mês/ano
    function formatsForMonthYear(year, month) {
        const mm = String(month).padStart(2, '0');
        const yyyy = String(year);
        return [
            `${yyyy}-${mm}`,
            `${mm}/${yyyy}`,
            `${mm}-${yyyy}`,
            `${yyyy}/${mm}`,
            `${mm}${yyyy}`
        ];
    }

    // Faturas que vencem no mês vigente
    fastify.get('/:idUsuario/faturas/mes', async function (request, reply) {
        const { idUsuario } = request.params;
        const hoje = new Date();
        const year = hoje.getFullYear();
        const month = hoje.getMonth() + 1;
        const patterns = formatsForMonthYear(year, month);

        try {
            const faturas = await fastify.prisma.faturas.findMany({
                where: {
                    usuario_id: Number(idUsuario),
                    OR: patterns.map(p => ({ mes_ano: { contains: p } }))
                },
                orderBy: { criado_em: 'asc' }
            });
            reply.send(faturas);
        } catch (error) {
            console.error('Erro ao buscar faturas do mês:', error);
            reply.code(500).send({ error: 'Erro ao buscar faturas.' });
        }
    });

    // Faturas que vencem nos próximos N meses
    fastify.get('/:idUsuario/faturas/proximos', {
        schema: getProximasFaturas,
        handler: handlerProximasFaturas
    });

    async function handlerProximasFaturas(request, reply) {
        const { idUsuario } = request.params;
        const monthsParam = Number(request.query.months) || 3;
        if (isNaN(monthsParam) || monthsParam <= 0) return reply.code(400).send({ error: 'Parâmetro months inválido.' });

        const patterns = [];
        const hoje = new Date();
        for (let i = 1; i <= monthsParam; i++) {
            const d = new Date(hoje.getFullYear(), hoje.getMonth() + i, 1);
            patterns.push(...formatsForMonthYear(d.getFullYear(), d.getMonth() + 1));
        }

        try {
            const faturas = await fastify.prisma.faturas.findMany({
                where: {
                    usuario_id: Number(idUsuario),
                    OR: patterns.map(p => ({ mes_ano: { contains: p } }))
                },
                orderBy: { criado_em: 'asc' }
            });
            reply.send(faturas);
        } catch (error) {
            console.error('Erro ao buscar faturas proximas:', error);
            reply.code(500).send({ error: 'Erro ao buscar faturas proximas.' });
        }
    }
}