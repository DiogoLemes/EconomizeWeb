module.exports = {
  registerUser: {
    description: 'Rota para registrar um usuário novo',
    tags: ['Auth'],
    summary: 'Cria um usuário com nome, email e senha enviados na requisição',
    body: {
      type: 'object',
      properties: {
        nome: { type: 'string' },
        email: { type: 'string' },
        senha: { type: 'string' }
      },
      required: ['nome','email', 'senha']
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