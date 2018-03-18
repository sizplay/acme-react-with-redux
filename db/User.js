const conn = require('./db');
const { Sequelize } = require('./db');

const User = conn.define('user', {
  name: Sequelize.STRING
});

module.exports = User;
