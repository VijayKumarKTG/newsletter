// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './db/subscription.db3',
    },
    useNullAsDefault: true,
  },
};
