'use strict'
const bcrypt = require('bcrypt');
module.exports = async function (fastify, opts) {
  fastify.post('/auth/register', async (request, reply) => {
    const { nome, email, senha } = request.body;
    if (!nome || !email || !senha) {
      return reply.code(400).send({ error: 'Nome, email e senha são obrigatórios.' });
    }
    try {
      const senha_hash = await bcrypt.hash(senha, 10);
      const usuario = await fastify.prisma.usuarios.create({
        data: {
          nome,
          email,
          senha_hash,
          data_criacao: new Date()
        }
      });
      reply.code(201).send({ id: usuario.id, nome: usuario.nome, email: usuario.email });
    } catch (error) {
      if (error.code === 'P2002') {
        reply.code(409).send({ error: 'Email já cadastrado.' });
      } else {
        reply.code(500).send({ error: 'Erro ao registrar usuário.' });
      }
    }
  });

  fastify.post('/auth/login', async (request, reply) => {
    const { email, senha } = request.body;
    if (!email || !senha) {
      return reply.code(400).send({ error: 'Email e senha são obrigatórios.' });
    }
    try {
      const usuario = await fastify.prisma.usuarios.findUnique({
      where: { email }

      });

      if (!usuario) {
        return reply.code(401).send({ error: 'Email ou senha inválidos.' });
      }

      const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);

      if (!senhaValida) {
        return reply.code(401).send({ error: 'Email ou senha inválidos.' });
      }

      reply.send({ id: usuario.id, nome: usuario.nome, email: usuario.email });

    } catch (error) {
      reply.code(500).send({ error: 'Erro ao autenticar usuário.' });
    }
  });
};