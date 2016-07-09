module.exports = function (sequelize, DataTypes) {
  const attributes = {
    title: DataTypes.STRING,
    symptoms: DataTypes.STRING,
    hotfix: DataTypes.STRING,
    description: DataTypes.STRING,
  };

  const Failure = sequelize.define('Failure', attributes);

  return Failure;
};
