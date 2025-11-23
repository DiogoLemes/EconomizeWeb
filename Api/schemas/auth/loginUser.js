module.exports = {
  loginUser: {
    description: 'Rota para fazer login de um usuário',
    tags: ['Auth'],
    summary: 'Recebe email e senha e loga o usuário se os dois forem corretos',
    body: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        senha: { type: 'string' }
      },
      required: ['email', 'senha']
    },
    response: {
      200: {
        description: 'Resposta com sucesso',
        type: 'object',
        properties: {
          id: { type: 'number' },
          nome: { type: 'string' },
          email: { type: 'string' },
          senha: { type: 'string' }
        },
      },
    },
  }
}
