const path = require('path');
const config = require('config');

const Sequelize = require('sequelize');

const configPostgres = config.get('postgres');
const sequelize = new Sequelize(configPostgres.url);
// const sequelize = new Sequelize(configPostgres.database, configPostgres.uername, configPostgres.password, {
//   host: configPostgres.host,
//   dialect: 'postgres',
// });

const User = sequelize.import(path.join(__dirname, 'user.model.js'));
const Failure = sequelize.import(path.join(__dirname, 'failure.model.js'));

const db = {
  User,
  Failure,
  sequelize,
  Sequelize,
};

module.exports = db;
