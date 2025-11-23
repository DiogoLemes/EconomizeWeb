'use strict'
const { createTransaction } = require('../schemas/transactions/createTransaction');
const { getAllTransactions } = require('../schemas/transactions/getAllTransactions');
const { getMonthTransactions } = require('../schemas/transactions/getMonthTransactions');
const { getTransaction } = require('../schemas/transactions/getTransaction');

module.exports = async function (fastify, opts) {

  // Rota para adicionar uma nova transação de um usuário
  // fastify.post('/:idUsuario', { schema: createTransaction }, async function (request, reply) {
  fastify.post('/:idUsuario', async function (request, reply) {
    const { idUsuario } = request.params;
    const { titulo, descricao, categoria_id, valor, data_trans, tipo, status_transferencia} = request.body;

    if (!titulo || !descricao || !categoria_id || !valor || !data_trans || !tipo || !status_transferencia) {
      return reply.code(400).send({ error: 'Campos obrigatórios faltando.' });
    }

    try {
      const trans = await fastify.prisma.transacoes.create({
        data: {
          usuario_id: Number(idUsuario),
          titulo,
          descricao,
          categoria_id: Number(categoria_id),
          valor: Number(valor),
          data_trans: new Date(data_trans),
          tipo,
          status_transferencia,
          criado_em: new Date()
        }
      });
      reply.code(201).send(converterDatasParaBrasilia([trans]));
    } catch (error) {
      console.log('Erro ao criar transação:', error);
      reply.code(500).send({ error: 'Erro ao criar transação.' });
    }
  })

  // Rota para obter uma transação específica de um usuário
  fastify.get('/:idUsuario/:idTrans', { schema: getTransaction }, async function (request, reply) {
    const { idUsuario, idTrans } = request.params;
    try {
      const trans = await fastify.prisma.transacoes.findFirst({
        where: {
          id: Number(idTrans),
          usuario_id: Number(idUsuario)
        }
      });
      if (!trans) {
        return reply.code(404).send({ error: 'Transação não encontrada.' });
      }
      reply.code(200).send(converterDatasParaBrasilia([trans]));
    } catch (error) {
      reply.code(500).send({ error: 'Erro ao buscar transação.' });
    }
  })

  // Rota para obter as transações do mês
  fastify.get('/month/:idUsuario', { schema: getMonthTransactions }, async function (request, reply) {
    const { idUsuario } = request.params;
    const { mes, ano } = request.query; // ex: /transacoes/month/100?mes=11&ano=2025
    var [inicioMes, fimMes] = checaMesAno(mes, ano)

    console.log("idUsuario: ", idUsuario)
    console.log("inicioMes: ", inicioMes)
    console.log("fimMes: ", fimMes)

    try {
      const trans = await fastify.prisma.transacoes.findMany({
        where: {
          usuario_id: Number(idUsuario),
          OR: [
            // { data_trans: null },
            { data_trans: { gte: inicioMes, lte: fimMes } }
          ]
        },
        orderBy: { data_trans: 'desc' }
      });
      console.log("trans: ", trans)
      reply.code(200).send(converterDatasParaBrasilia(trans));
    } catch (error) {
      console.log(error)
      reply.code(500).send({ error: 'Erro ao buscar transações do mês.' });
    }
  })

  // Rota para obter todas transações de um usuário
  fastify.get('/:idUsuario', { schema: getAllTransactions }, async function (request, reply) {
    const { idUsuario } = request.params;
    try {
      const trans = await fastify.prisma.transacoes.findMany({
        where: {
          usuario_id: Number(idUsuario)
        },
        orderBy: { criado_em: 'desc' }
      });
      reply.code(200).send(converterDatasParaBrasilia(trans));
    } catch (error) {
      console.error('Erro ao buscar todas as transações:', error);
      reply.code(500).send({ error: 'Erro ao buscar transações.' });
    }
  })
  
  // Rota para editar uma transação específica de um usuário */
  fastify.patch('/:idUsuario/:idTrans', async function (request, reply) {
    //mudar os parametros
    const { idUsuario, idTrans } = request.params;
    const { titulo, descricao, categoria_id, valor, data_trans, tipo, status_transferencia} = request.body;

    // Monta objeto de atualização apenas com campos permitidos
    const dataToUpdate = {};
    if (titulo !== undefined) dataToUpdate.titulo = titulo;
    if (descricao !== undefined) dataToUpdate.descricao = descricao;
    if (categoria_id !== undefined) dataToUpdate.categoria_id = categoria_id;
    if (valor !== undefined) dataToUpdate.valor = valor;
    if (data_trans !== undefined) dataToUpdate.data_trans = new Date(data_trans);
    if (tipo !== undefined) dataToUpdate.tipo = Number(tipo);
    if (status_transferencia !== undefined) dataToUpdate.status_transferencia = status_transferencia;

    try {
      const trans = await fastify.prisma.transacoes.update({
        where: {
          id: Number(idTrans),
          usuario_id: Number(idUsuario)
        },
        data: dataToUpdate
      });

      reply.code(204).send(converterDatasParaBrasilia([trans]));
    } catch (error) {
      reply.code(500).send({ error: 'Erro ao editar transação.' });
    }
  })

  //Rota para deletar uma transação específica de um usuário
  fastify.delete('/:idUsuario/:idTrans', async function (request, reply) {
    const { idUsuario, idTrans } = request.params;
    try {
      await fastify.prisma.transacoes.delete({
        where: {
          id: Number(idTrans),
          usuario_id: Number(idUsuario)
        }
      });
      reply.code(204).send({ success: true });
    } catch (error) {
      reply.code(500).send({ error: 'Erro ao deletar transação.' });
    }
  })
}

function checaMesAno(mes, ano){
  if (mes === undefined || (typeof mes != "number" && mes != parseInt(mes))) {
    mes = new Date().getMonth()
  }
  console.log("mes: "+mes)

  if (ano === undefined || (typeof ano != "number" && ano != parseInt(ano))){
    ano = new Date().getFullYear()
  }
  console.log("ano: "+ano)

  //retorna inicio e fim do mês
  return [new Date(ano, mes - 1, 1), new Date(ano, mes, 0, 23, 59, 59)]
}

function converterDatasParaBrasilia(objeto) {
  return objeto.map(obj => ({
    ...obj,
    data_trans: obj.data_trans ? new Date(obj.data_trans).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }) : null,
    criado_em: obj.criado_em ? new Date(obj.criado_em).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }) : null
  }));
}