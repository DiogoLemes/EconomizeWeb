const Belvo = require('belvo').default;
require('dotenv').config();
const axios = require('axios');

module.exports = async function (fastify, opts) {
  fastify.get('/institutions', async (request, reply) => {
    const SECRET_ID = process.env.BELVO_SECRET_ID;
    const SECRET_PASSWORD = process.env.BELVO_SECRET_PASSWORD
    const LINK_ID = process.env.BELVO_LINK_ID;
    const authHeader = 'Basic ' + Buffer.from(`${SECRET_ID}:${SECRET_PASSWORD}`).toString('base64');

  });  
};
