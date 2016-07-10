module.exports = function (sequelize, DataTypes) {
  const attributes = {
    githubId: DataTypes.INTEGER,
    username: DataTypes.STRING,
    profile: DataTypes.STRING,
    accessToken: DataTypes.STRING,
    refreshToken: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    avatar: DataTypes.STRING,

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
    associate: function (models) {
      User.hasMany(models.Failure);
    }
  };

  const User = sequelize.define('User', attributes, options);

  return User;
};
