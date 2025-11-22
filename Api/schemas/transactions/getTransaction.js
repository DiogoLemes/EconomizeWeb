module.exports = {
  getTransaction: {
    description: 'Rota para obter uma transação específica de um usuário',
    tags: ['Transactions'],
    summary: 'Obtém a transação com base no ID dela e do usuário',
    params: {
      type: 'object',
      properties: {
        idUsuario: { type: 'string', description: 'ID do usuario' },
        idTrans: { type: 'string', description: 'ID da transação' },
      },
      required: ['idUsuario', 'idTrans'],
    },
    response: {
      200: {
        description: 'Resposta com sucesso',
        type: 'array',
        // additionalProperties: true,
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