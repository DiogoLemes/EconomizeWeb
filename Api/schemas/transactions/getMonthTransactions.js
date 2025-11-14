module.exports = {
    getMonthTransactions: {
      description: 'Rota para obter as transações do mês e ano específico. Por padrão retorna do mês atual',
      tags: ['Transactions'],
      summary: 'Obtém transações com base no ID e filtros de query',
      params: {
        type: 'object',
        properties: {
          idUsuario: { type: 'string', description: 'ID do usuario' },
        },
        required: ['idUsuario'],
      },
      querystring: {
        type: 'object',
        properties: {
          mes: { type: 'number', description: 'Mês (Opcional)' },
          ano: { type: 'number', description: 'Ano (Opcional)' },
        },
      },
      response: {
        200: {
          description: 'Resposta com sucesso',
          type: 'object',
          properties: {
            id: { type: 'number' },
            usuario_id: { type: 'number' },
            titulo: { type: 'string' },
            descricao: { type: 'string' },
            categoria_id: { type: 'number' },
            valor: { type: 'number' },
            tipo: { type: 'string' },
            status_transferencia: { type: 'string' },
            criado_em: { type: 'string', format: 'date' },
            data_trans: { type: 'string', format: 'date' }
          },
        },
      },
    }
}