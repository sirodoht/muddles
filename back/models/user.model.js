module.exports = function(sequelize, DataTypes) {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    githubId: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },

    lastLogin: DataTypes.DATE,
    lastIp: {
      type: DataTypes.STRING,
      validate: {
        isIP: true,
      },
    },
  };

  const options = {};
  options.classMethods = {
    associate: function(models) {
      User.hasMany(models.Failure);
    }
  };

  const User = sequelize.define('User', attributes, options);

  return User;
};
