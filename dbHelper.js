const knex = require('knex');
const config = require('./knexfile');
const db = knex(config.development);

const add = async (email) => {
  const [id] = await db('subscription').insert(email);
  return id;
};

const find = async () => {
  return db('subscription');
};

module.exports = {
  add,
  find,
};
