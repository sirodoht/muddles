const path = require('path');
const config = require('config');

const Sequelize = require('sequelize');

const configPostgres = config.get('postgres');
const sequelize = new Sequelize(configPostgres.url);
// const sequelize = new Sequelize(configPostgres.database, configPostgres.uername, configPostgres.password, {
//   host: configPostgres.host,
//   dialect: 'postgres',
// });

const user = sequelize.import(path.join(__dirname, 'user.model.js'));
const failure = sequelize.import(path.join(__dirname, 'failure.model.js'));

const db = {
  User: user,
  Failure: failure,
  sequelize,
  Sequelize,
};

module.exports = db;
