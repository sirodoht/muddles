module.exports = function (sequelize, DataTypes) {
  const attributes = {
    githubId: DataTypes.INTEGER,

    accessToken: DataTypes.STRING,
    refreshToken: DataTypes.STRING,

    username: DataTypes.STRING,
    profile: DataTypes.STRING,
    avatar: DataTypes.STRING,
  };

  const options = {};
  // options.classMethods = {
  //   associate: function (models) {
  //     User.hasMany(models.Muddle);
  //   }
  // };

  const User = sequelize.define('User', attributes, options);

  return User;
};
