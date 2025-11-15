module.exports = {
    getProximasFaturas: {
      description: 'Rota para obter as faturas dos próximos N meses. Por padrão retorna dos 3 meses seguintes',
      tags: ['Dashboard'],
      summary: 'Obtém transações com base no ID e parâmetro da query',
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
          months: { type: 'number', description: 'Meses (Opcional)' },
        },
      },
      response: {
        200: {
          description: 'Resposta com sucesso',
          type: 'object',
          properties: {
            id: { type: 'number' },
            cartao_id: { type: 'number' },
            mes_ano: { type: 'string' },
            valor_total: { type: 'number' },
            status: { type: 'string' },
            criado_em: { type: 'string', format: 'date' }
          },
        },
      },
    }
}