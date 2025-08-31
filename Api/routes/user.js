'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/usuarios', async (request, reply) => {
    // Exemplo usando Prisma
    const usuarios = await fastify.prisma.usuarios.findMany();
    return usuarios;
  });
};
