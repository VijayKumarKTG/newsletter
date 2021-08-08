exports.up = function (knex) {
  return knex.schema.createTable('subscription', (tbl) => {
    tbl.increments();
    tbl.text('email', 120).notNullable();
    tbl.unique('email');
    tbl.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('subscription');
};
