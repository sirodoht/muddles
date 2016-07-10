const path = require('path');
const config = require('config');

const Sequelize = require('sequelize');

const configPostgres = config.get('postgres');
const sequelize = new Sequelize(configPostgres.url);

const User = sequelize.import(path.join(__dirname, 'user.model.js'));
const Muddle = sequelize.import(path.join(__dirname, 'muddle.model.js'));

const db = {
  User,
  Muddle,
  sequelize,
  Sequelize,
};

module.exports = db;
