module.exports = function (sequelize, DataTypes) {
  const attributes = {
    title: DataTypes.STRING,
    symptoms: DataTypes.TEXT,
    hotfix: DataTypes.TEXT,
    description: DataTypes.TEXT,
  };

  const Failure = sequelize.define('Failure', attributes);

  return Failure;
};
