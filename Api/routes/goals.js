'use strict'

module.exports = async function (fastify, opts) {
  /* Rota para obter as metas ativas para um usuário específico */
  fastify.get('/active/:idUsuario', async function (request, reply) {
    const { idUsuario } = request.params;
    const hoje = new Date();
    try {
      const metas = await fastify.prisma.metas.findMany({
        where: {
          usuario_id: Number(idUsuario),
          OR: [
            { data_fim: null },
            { data_fim: { gte: hoje } }
          ]
        },
        orderBy: { criado_em: 'desc' }
      });
      // Atualiza o status das metas
      await atualizarStatusMetas(fastify, metas);
      // Filtra metas que ainda não atingiram o valor da meta, prismna não suporta essa condição diretamente
      const metasAtivas = metas.filter(meta => Number(meta.valor_atual) < Number(meta.valor_meta));
      console.log('Metas ativas filtradas:', metasAtivas);
      reply.send(formatarMetasParaBrasilia(metasAtivas));
    } catch (error) {
      reply.code(500).send({ error: 'Erro ao buscar metas.' });
    }
  })

  /* Rota para editar uma meta específica de um usuário */
  fastify.patch('/:idUsuario/:idGoal', async function (request, reply) {
    const { idUsuario, idGoal } = request.params;
    const { nome, valor_meta, valor_atual, tipo, data_inicio, data_fim } = request.body;

    // Monta objeto de atualização apenas com campos permitidos
    const dataToUpdate = {};
    if (nome !== undefined) dataToUpdate.nome = nome;
    if (valor_meta !== undefined) dataToUpdate.valor_meta = Number(valor_meta);
    if (valor_atual !== undefined) dataToUpdate.valor_atual = Number(valor_atual);
    if (tipo !== undefined) dataToUpdate.tipo = Number(tipo);
    if (data_inicio !== undefined) dataToUpdate.data_inicio = new Date(data_inicio);
    if (data_fim !== undefined) dataToUpdate.data_fim = data_fim ? new Date(data_fim) : null;

    try {
      const meta = await fastify.prisma.metas.update({
        where: {
          id: Number(idGoal),
          usuario_id: Number(idUsuario)
        },
        data: dataToUpdate
      });
      await atualizarStatusMetas(fastify, [meta]);
      reply.send(formatarMetasParaBrasilia([meta]));

    } catch (error) {
      reply.code(500).send({ error: 'Erro ao editar meta.' });
    }
  })

  /* Rota para deletar uma meta específica de um usuário */
  fastify.delete('/:idUsuario/:idGoal', async function (request, reply) {
    const { idUsuario, idGoal } = request.params;
    try {
      await fastify.prisma.metas.delete({
        where: {
          id: Number(idGoal),
          usuario_id: Number(idUsuario)
        }
      });
      reply.send({ success: true });
    } catch (error) {
      reply.code(500).send({ error: 'Erro ao deletar meta.' });
    }
  })
  
  /* Rota para adicionar uma nova meta para um usuário específico */
  fastify.post('/:idUsuario', async function (request, reply) {
    const { idUsuario } = request.params;
    const { nome, valor_meta, valor_atual, tipo, data_inicio, data_fim} = request.body;

    if (!nome || !valor_meta || !tipo || !data_inicio) {
      return reply.code(400).send({ error: 'Campos obrigatórios faltando.' });
    }

    try {
      const meta = await fastify.prisma.metas.create({
        data: {
          usuario_id: Number(idUsuario),
          nome,
          valor_meta: Number(valor_meta),
          valor_atual: Number(valor_atual) || 0,
          tipo: Number(tipo),
          data_inicio: new Date(data_inicio),
          data_fim: data_fim ? new Date(data_fim) : null,
          status: 'ativa',
          criado_em: new Date()
        }
      });
      await atualizarStatusMetas(fastify, [meta]);

      reply.code(201).send(formatarMetasParaBrasilia([meta]));
    } catch (error) {
      console.log('Erro ao adicionar meta:', error);
      reply.code(500).send({ error: 'Erro ao criar meta.' });
    }
    
  })

  /* Rota para obter o histórico de metas de um usuário */
  fastify.get('/:idUsuario', async function (request, reply) {
    const { idUsuario } = request.params;
    const hoje = new Date();
    try {
      const metas = await fastify.prisma.metas.findMany({
        where: {
          usuario_id: Number(idUsuario)
        },
        orderBy: { criado_em: 'desc' }
      });
      await atualizarStatusMetas(fastify, metas);
      // Filtra metas que passaram do prazo, atingiram a meta ou não têm meta
      const metasHistoricas = metas.filter(meta =>
        (meta.data_fim != null && meta.data_fim < hoje) || (Number(meta.valor_atual) >= Number(meta.valor_meta))
      );
      reply.send(formatarMetasParaBrasilia(metasHistoricas));
    } catch (error) {
      console.error('Erro em histGoals:', error);
      reply.code(500).send({ error: 'Erro ao buscar metas.' });
    }
  })

  /* Rota para obter uma meta específica de um usuário */
  fastify.get('/:idUsuario/:idGoal', async function (request, reply) {
    const { idUsuario, idGoal } = request.params;
    try {
      const meta = await fastify.prisma.metas.findFirst({
        where: {
          id: Number(idGoal),
          usuario_id: Number(idUsuario)
        }
      });
      if (!meta) {
        return reply.code(404).send({ error: 'Meta não encontrada.' });
      }
      reply.send(formatarMetasParaBrasilia([meta]));
    } catch (error) {
      reply.code(500).send({ error: 'Erro ao buscar meta.' });
    }
  })

  console.log('fim de rotas...');
}

async function atualizarStatusMetas(fastify, metas) {
  console.log('Iniciando atualização de status para metas...');
  const hoje = new Date();

  for (const meta of metas) {
    console.log('Atualizando status para meta:', meta.id);
    // Calcula percentual da meta atingida
    const metaPercent = Math.min(100, Math.round((Number(meta.valor_atual) / Number(meta.valor_meta)) * 100));
    // Calcula percentual do tempo decorrido
    let tempoPercent = 0;
    if (meta.data_inicio && meta.data_fim) {
      const inicio = new Date(meta.data_inicio);
      const fim = new Date(meta.data_fim);
      const total = fim - inicio;
      const decorrido = hoje - inicio;
      tempoPercent = Math.min(100, Math.round((decorrido / total) * 100));
    }
    console.log(`Meta ID: ${meta.id}, Meta Percent: ${metaPercent}%, Tempo Percent: ${tempoPercent}%`);
    let status = meta.status;

    if (metaPercent < 50 && tempoPercent < 50) status = 'Ativo', console.log(status);
    else if (metaPercent < 50 && tempoPercent >= 50 && tempoPercent < 100 && (tempoPercent-metaPercent)  > 0) status = 'Acelere o Ritmo', console.log(status);
    else if (metaPercent !== 100 && tempoPercent >= 100) status = 'Não Concluído', console.log(status);
    else if (metaPercent < 100 &&(metaPercent >= 50 && metaPercent < 100) && (tempoPercent < 50 || (tempoPercent >= 50 && (tempoPercent-metaPercent) <= 0 ))) status = 'Esta no Caminho certo', console.log(status);
    else if (metaPercent === 100) status = 'Concluído', console.log(status);
    else status = 'Ativo', console.log(status);

    // Atualiza no banco se mudou
    if (meta.status !== status) {
      await fastify.prisma.metas.update({
        where: { id: meta.id },
        data: { status }
      });
      meta.status = status;
    }
  }
  console.log('Atualização de status para metas concluída.');
}

function formatarMetasParaBrasilia(metas) {
  return metas.map(meta => ({
    ...meta,
    data_inicio: meta.data_inicio ? new Date(meta.data_inicio).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }) : null,
    data_fim: meta.data_fim ? new Date(meta.data_fim).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }) : null,
    criado_em: meta.criado_em ? new Date(meta.criado_em).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }) : null
  }));
}