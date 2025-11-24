module.exports = {
    deleteGoal: {
      description: 'Rota para deletar uma meta de um usuário',
      tags: ['Goals'],
      summary: 'Deleta meta de um usuário com base no ID',
      params: {
        type: 'object',
        properties: {
          idUsuario: { type: 'string', description: 'ID do usuario' },
          idGoal: { type: 'string', description: 'ID da meta' },
        },
        required: ['idUsuario', 'idGoal'],
      },
      response: {
        204: {
          description: 'Resposta com sucesso',
          type: 'object',
          properties: {},
        },
      },
    }
}