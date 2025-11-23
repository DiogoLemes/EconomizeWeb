module.exports = {
    deleteUser: {
      description: 'Rota para deletar um usuário',
      tags: ['User'],
      summary: 'Deleta usuário com base no ID',
      params: {
        type: 'object',
        properties: {
          idUsuario: { type: 'string', description: 'ID do usuario' },
        },
        required: ['idUsuario'],
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