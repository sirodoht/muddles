module.exports = function (sequelize, DataTypes) {
  const attributes = {
    title: DataTypes.STRING,
    symptoms: DataTypes.TEXT,
    hotfix: DataTypes.TEXT,
    description: DataTypes.TEXT,
  };

  const Muddle = sequelize.define('Muddle', attributes);

  return Muddle;
};
