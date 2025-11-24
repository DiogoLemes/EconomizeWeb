module.exports = {
    getActiveGoals: {
      description: 'Rota para obter as metas ativas de um usuário',
      tags: ['Goals'],
      summary: 'Obtém as metas ativas com base no ID do usuário',
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