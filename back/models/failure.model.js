module.exports = function (sequelize, DataTypes) {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    symptoms: DataTypes.STRING,
    hotfix: DataTypes.STRING,
    description: DataTypes.STRING,
  };

  const Failure = sequelize.define('Failure', attributes);

  return Failure;
};