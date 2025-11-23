'use strict'

const { deleteUser } = require("../schemas/user/deleteUser");

module.exports = async function (fastify, opts) {
  fastify.get('/', async (request, reply) => {
    const usuarios = await fastify.prisma.usuarios.findMany();
    return usuarios;
  });
  
  fastify.delete('/:idUsuario', { schema: deleteUser }, async (request, reply) => {
    const { idUsuario } = request.params

    console.log("idUsuario: ", idUsuario)
    try {
      //tenta procurar usuário e deletar do banco
      const usuarioDeletado = await fastify.prisma.usuarios.delete({
        where: {
          id: Number(idUsuario)
        }
      })

      if (!usuarioDeletado){
        return reply.code(404).send({ error: 'Usuario não encontrado.' })
      }
      return reply.code(204).send('Usuario deletado')
    } catch (error) {
      console.log("error: ", error)
      return reply.code(500).send({ error: "Erro ao deletar usuário" })
    }
  })
};
