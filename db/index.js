const User = require('./User');
const conn = require('./db');

const sync = () => {
  return conn.sync({ force: true });
};

const seed = () => {
  return Promise.all([
    User.create({ name: 'Captain America' }),
    User.create({ name: 'Iron Man' }),
    User.create({ name: 'Black Widow' }),
    User.create({ name: 'Spider Man' })
  ]);
};

module.exports = {
  sync,
  seed,
  models: {
    User
  }
};
