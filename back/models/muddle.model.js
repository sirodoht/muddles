module.exports = function (sequelize, DataTypes) {
  const attributes = {
    title: DataTypes.STRING,
    symptoms: DataTypes.TEXT,
    hotfix: DataTypes.TEXT,
    description: DataTypes.TEXT,
  };

  const options = {};
  // options.classMethods = {
  //   associate: function (models) {
  //     models.Muddle.belongsTo(models.User);
  //   }
  // };

  const Muddle = sequelize.define('Muddle', attributes, options);

  return Muddle;
};
