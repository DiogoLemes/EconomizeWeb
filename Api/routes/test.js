const Belvo = require('belvo').default;
require('dotenv').config();
const axios = require('axios');

module.exports = async function (fastify, opts) {
  fastify.get('/institutions', async (request, reply) => {
    const belvo = new Belvo(
      process.env.BELVO_SECRET_ID,
      process.env.BELVO_SECRET_PASSWORD,
      process.env.BELVO_URL || 'https://sandbox.belvo.com'
    );
    try {
      await belvo.connect();
      const institutions = await belvo.institutions.list();
      return institutions;
    } catch (error) {
      console.error('Erro Belvo:', error);
      reply.code(500).send({ error: error.message });
    }
  });
};

module.exports = async function (fastify, opts) {
  fastify.get('/cartoes', async (request, reply) => {
    try {
      // Autenticação básica
      const auth = Buffer.from(
        `${process.env.BELVO_SECRET_ID}:${process.env.BELVO_SECRET_PASSWORD}`
      ).toString('base64');

      // 1. Criar link
      const linkRes = await axios.post(
        `${process.env.BELVO_URL || 'https://sandbox.belvo.com'}/api/links/`,
        {
          institution: 'erebor_br_retail',
          username: 'user123',
          password: 'pass123',
          sandbox: true
        },
        {
          headers: {
            Authorization: `Basic ${auth}`,
            'Content-Type': 'application/json'
          }
        }
      );
      const linkId = linkRes.data.id;
      
      // 2. Listar contas
      const accountsRes = await axios.get(
        `${process.env.BELVO_URL || 'https://sandbox.belvo.com'}/api/transactions/?link=${linkId}`,
        {
          headers: {
            Authorization: `Basic ${auth}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('Contas retornadas:', accountsRes);
      // Filtra cartões de crédito
      const cartoes = (accountsRes.data.results || []).filter(acc => acc.type === 'credit_card');
      return cartoes;
    } catch (error) {
      console.error('Erro Belvo:', error.response?.data || error.message);
      reply.code(500).send({ error: error.message });
    }
  });
};