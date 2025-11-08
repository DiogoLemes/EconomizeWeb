'use strict'

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

    fastify.patch('/:idUsuario/saldo', async function (request, reply) {
        const { idUsuario } = request.params;
        const { valor } = request.body || {};

        const valorNum = Number(valor);
        if (!isFinite(valorNum) || valorNum <= 0) {
            return reply.code(400).send({ error: 'Valor inválido.' });
        }

        try {
            // Confirma que o usuário sexiste antes de tentar atualizar
            const existe = await fastify.prisma.usuarios.findUnique({ where: { id: Number(idUsuario) }, select: { id: true } });
            if (!existe) return reply.code(404).send({ error: 'Usuário não encontrado.' });

            const usuario = await fastify.prisma.usuarios.update({
                where: { id: Number(idUsuario) },
                data: { saldo: { increment: valorNum } },
                select: { saldo: true }
            });

            const saldoOut = usuario.saldo && usuario.saldo.toString ? usuario.saldo.toString() : usuario.saldo;
            reply.send({ saldo: saldoOut });
        } catch (error) {
            console.error('Erro ao adicionar saldo:', error);
            reply.code(500).send({ error: 'Erro ao adicionar saldo.' });
        }
    });

    // Adicionar despesa
    fastify.patch('/:idUsuario/despesa', async function (request, reply) {
        const { idUsuario } = request.params;
        const { valor } = request.body || {};

        if (valor === undefined || valor === null) {
            return reply.code(400).send({ error: 'Campo obrigatório: valor.' });
        }

        if (isNaN(Number(valor)) || Number(valor) <= 0) {
            return reply.code(400).send({ error: 'Valor inválido.' });
        }

        try {
            // Incrementa o total de despesas no registro do usuário
            const usuarioAtualizado = await fastify.prisma.usuarios.update({
                where: { id: Number(idUsuario) },
                data: {
                    despesa: { increment: Number(valor) }
                },
                select: { id: true, despesa: true }
            });

            
            reply.code(200).send({ usuario_id: usuarioAtualizado.id, despesa: usuarioAtualizado.despesa });
        } catch (error) {
            console.error('Erro ao atualizar despesa do usuário:', error);
            reply.code(500).send({ error: 'Erro ao registrar despesa.' });
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
    fastify.get('/:idUsuario/faturas/proximos', async function (request, reply) {
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
}