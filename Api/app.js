'use strict'

const path = require('node:path')
const AutoLoad = require('@fastify/autoload')

// Pass --options via CLI arguments in command to enable these options.
const options = {}

module.exports = async function (fastify, opts) {

  await fastify.register(require('@fastify/cors'), {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
  })

  //Swagger
  fastify.register(require('@fastify/swagger'), {
    openapi: {
      info: {
        title: 'Minha API com Fastify',
        description: 'Documentação gerada automaticamente com Swagger',
        version: '1.0.0',
      },
    },
  });
  
  fastify.register(require('@fastify/swagger-ui'), {
    routePrefix: '/docs', // endpoint onde a doc ficará acessível
    uiConfig: {
      docExpansion: 'list',
      deepLinking: false,
    },
  });

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  //define o prefixo de cada rota
  fastify.register(require('./routes/root'));
  fastify.register(require('./routes/auth'), { prefix: '/auth' });
  fastify.register(require('./routes/goals'), { prefix: '/goals' });
  fastify.register(require('./routes/transactions'), { prefix: '/transactions' });
  fastify.register(require('./routes/user'), { prefix: '/usuarios' });
  fastify.register(require('./routes/category'), { prefix: '/categories' });
  fastify.register(require('./routes/dash'), { prefix: '/dashboard' });
}

module.exports.options = options
