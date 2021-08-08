const knex = require('knex');
const config = require('./knexfile');
const db = knex(config.development);

const add = async (email) => {
  try {
    const [id] = await db('subscription').insert(email);
    return id;
  } catch (err) {
    return err;
  }
};

const find = async () => {
  return db('subscription');
};

module.exports = {
  add,
  find,
};
