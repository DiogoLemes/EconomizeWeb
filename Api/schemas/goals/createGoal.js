module.exports = {
    createGoal: {
      description: 'Rota para criar meta de um usuário',
      tags: ['Goals'],
      summary: 'Cria meta com os parâmetros do body da requisição',
      params: {
        type: 'object',
        properties: {
          idUsuario: { type: 'string', description: 'ID do usuario' },
        },
        required: ['idUsuario'],
      },
      body: {
        type: 'object',
        properties: {
          nome: { type: 'string' },
          valor_meta: { type: 'number' },
          valor_atual: { type: 'number' },
          tipo: { type: 'number' },
          data_inicio: { type: 'string', format: 'date' },
          data_fim: { type: 'string', format: 'date' }
        },
        required: ['nome', 'valor_meta', 'tipo', 'data_inicio']
      },
      response: {
        201: {
          description: 'Resposta com sucesso',
          type: 'array',
          properties: {
            id: { type: 'number' },
            usuario_id: { type: 'number' },
            nome: { type: 'string' },
            valor_meta: { type: 'number' },
            valor_atual: { type: 'number' },
            tipo: { type: 'number' },
            data_inicio: { type: 'string', format: 'date' },
            data_fim: { type: 'string', format: 'date' },
            status: { type: 'string' },
            criado_em: { type: 'string', format: 'date' }
          },
        },
      },
    }
  }
  