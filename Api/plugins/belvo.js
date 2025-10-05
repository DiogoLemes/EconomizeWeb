const fp = require('fastify-plugin');
const Belvo = require('belvo').default;
require('dotenv').config();
async function belvoPlugin(fastify, opts) {
  // Use variáveis de ambiente para credenciais
  const secretId = process.env.BELVO_SECRET_ID;
  const secretPassword = process.env.BELVO_SECRET_PASSWORD;
  const url = process.env.BELVO_URL || 'https://sandbox.belvo.com';

  const belvo = new Belvo(secretId, secretPassword, url);

  fastify.decorate('belvo', belvo);
}

module.exports = fp(belvoPlugin);