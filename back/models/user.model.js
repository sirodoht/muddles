const Promise = require('bluebird');
const Sequelize = require('sequelize');

Promise.promisifyAll(require('bcrypt'));

module.exports = function (sequelize, DataTypes) {
  const attributes = {
    githubId: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },

    lastLogin: Sequelize.DATE,
    lastIp: {
      type: Sequelize.STRING,
      validate: {
        isIP: true,
      },
    },
  };

  const options = {};
  options.classMethods = {
    associate: function (models) {
      User.hasMany(models.Fail);
    }
  };

  const User = sequelize.define('User', attributes, options);

  return User;
};
