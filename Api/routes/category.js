'use strict'

module.exports = async function (fastify, opts) {
  const model = 'categorias'

  // Listar categorias de um usuário
  fastify.get('/:idUsuario', async (request, reply) => {
    const { idUsuario } = request.params
    try {
      const categorias = await fastify.prisma[model].findMany({
        where: { usuario_id: Number(idUsuario) },
        orderBy: { nome: 'asc' }
      })
      return reply.send(categorias)
    } catch (err) {
      console.error('Erro listar categorias:', err)
      return reply.code(500).send({ error: 'Erro ao listar categorias.' })
    }
  })

  // Pegar uma categoria específica
  fastify.get('/:idUsuario/:idCategoria', async (request, reply) => {
    const { idUsuario, idCategoria } = request.params
    try {
      const categoria = await fastify.prisma[model].findUnique({
        where: { id: Number(idCategoria) }
      })
      if (!categoria || Number(categoria.usuario_id) !== Number(idUsuario)) {
        return reply.code(404).send({ error: 'Categoria não encontrada.' })
      }
      return reply.send(categoria)
    } catch (err) {
      console.error('Erro buscar categoria:', err)
      return reply.code(500).send({ error: 'Erro ao buscar categoria.' })
    }
  })

  // Criar categoria
  fastify.post('/:idUsuario', async (request, reply) => {
    const { idUsuario } = request.params
    const { nome, tipo, cor, icone } = request.body || {}

    if (!nome || !tipo) {
      return reply.code(400).send({ error: 'Campos obrigatórios: nome, tipo.' })
    }

    try {
      const nova = await fastify.prisma[model].create({
        data: {
          usuario_id: Number(idUsuario),
          nome: String(nome).trim(),
          tipo: String(tipo).trim(),
          cor: cor ? String(cor).trim() : null,
          icone: icone ? String(icone).trim() : null
        }
      })
      return reply.code(201).send(nova)
    } catch (err) {
      console.error('Erro criar categoria:', err)
      return reply.code(500).send({ error: 'Erro ao criar categoria.' })
    }
  })

  // Editar categoria
  fastify.patch('/:idUsuario/:idCategoria', async (request, reply) => {
    const { idUsuario, idCategoria } = request.params
    const { nome, tipo, cor, icone } = request.body || {}

    if (nome === undefined && tipo === undefined && cor === undefined && icone === undefined) {
      return reply.code(400).send({ error: 'Nenhum campo para atualizar.' })
    }

    try {
      const categoria = await fastify.prisma[model].findUnique({ where: { id: Number(idCategoria) } })
      if (!categoria || Number(categoria.usuario_id) !== Number(idUsuario)) {
        return reply.code(404).send({ error: 'Categoria não encontrada.' })
      }

      const dataToUpdate = {}
      if (nome !== undefined) dataToUpdate.nome = String(nome).trim()
      if (tipo !== undefined) dataToUpdate.tipo = String(tipo).trim()
      if (cor !== undefined) dataToUpdate.cor = cor ? String(cor).trim() : null
      if (icone !== undefined) dataToUpdate.icone = icone ? String(icone).trim() : null

      const atualizado = await fastify.prisma[model].update({
        where: { id: Number(idCategoria) },
        data: dataToUpdate
      })
      return reply.send(atualizado)
    } catch (err) {
      console.error('Erro atualizar categoria:', err)
      return reply.code(500).send({ error: 'Erro ao atualizar categoria.' })
    }
  })

  // Deletar categoria
  fastify.delete('/:idUsuario/:idCategoria', async (request, reply) => {
    const { idUsuario, idCategoria } = request.params
    try {
      const categoria = await fastify.prisma[model].findUnique({ where: { id: Number(idCategoria) } })
      if (!categoria || Number(categoria.usuario_id) !== Number(idUsuario)) {
        return reply.code(404).send({ error: 'Categoria não encontrada.' })
      }

      await fastify.prisma[model].delete({ where: { id: Number(idCategoria) } })
      return reply.code(204).send()
    } catch (err) {
      console.error('Erro deletar categoria:', err)
      return reply.code(500).send({ error: 'Erro ao deletar categoria.' })
    }
  })
}