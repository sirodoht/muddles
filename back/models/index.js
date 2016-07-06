const path = require('path');
const config = require('config');

const Sequelize = require('sequelize');

const configPostgres = config.get('postgres');
const sequelize = new Sequelize('postgres://postgres:8d38d31570aa40e9795f3df17a75b5f0@dokku-postgres-muddles:5432/muddles');
// const sequelize = new Sequelize(configPostgres.database, configPostgres.uername, configPostgres.password, {
//   host: configPostgres.host,
//   dialect: 'postgres',
// });

const user = sequelize.import(path.join(__dirname, 'user.model.js'));

const db = {
  User: user,
  sequelize,
  Sequelize,
};

module.exports = db;
