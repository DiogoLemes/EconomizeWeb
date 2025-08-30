const fp = require('fastify-plugin');
const { PrismaClient } = require('@prisma/client');

async function prismaPlugin(fastify, options) {
  const prisma = new PrismaClient();
  fastify.decorate('prisma', prisma);

  fastify.addHook('onClose', async (instance, done) => {
    await prisma.$disconnect();
    done();
  });
}

module.exports = fp(prismaPlugin);