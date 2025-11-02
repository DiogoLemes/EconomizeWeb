'use strict'

const path = require('node:path')
const AutoLoad = require('@fastify/autoload')

// Pass --options via CLI arguments in command to enable these options.
const options = {}

module.exports = async function (fastify, opts) {
  // Place here your custom code!

  await fastify.register(require('@fastify/cors'), {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
  })

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  // fastify.register(AutoLoad, {
  //   dir: path.join(__dirname, 'routes'),
  //   options: Object.assign({}, opts)
  // })

  //define o prefixo de cada rota
  fastify.register(require('./routes/root'));
  fastify.register(require('./routes/auth'), { prefix: '/auth' });
  fastify.register(require('./routes/goals'), { prefix: '/goals' });
  fastify.register(require('./routes/transactions'), { prefix: '/transactions' });
  fastify.register(require('./routes/user'), { prefix: '/usuarios' });
  //adicionar a rota do test.js aqui se for necessário

}

module.exports.options = options
