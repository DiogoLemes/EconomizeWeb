module.exports = {
  getAllTransactions: {
    description: 'Rota para obter todas as transações de um usuário',
    tags: ['Transactions'],
    summary: 'Obtém as transações com base no ID do usuário',
    params: {
      type: 'object',
      properties: {
        idUsuario: { type: 'string', description: 'ID do usuario' }
      },
      required: ['idUsuario'],
    },
    response: {
      200: {
        description: 'Resposta com sucesso',
        type: 'array',
        properties: {
          id: { type: 'number' },
          usuario_id: { type: 'number' },
          titulo: { type: 'string' },
          descricao: { type: 'string' },
          categoria_id: { type: 'number' },
          valor: { type: 'string' },
          tipo: { type: 'string' },
          status_transferencia: { type: 'string' },
          criado_em: { type: 'string', format: 'date' },
          data_trans: { type: 'string', format: 'date' }
        },
      },
    },
  }
}
