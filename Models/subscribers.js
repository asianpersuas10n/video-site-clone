module.exports = (sequelize, DataTypes) => {
  const Subscriber = sequelize.define("Subscriber", {
    uid: {
      type: DataTypes.STRING,
    },
    dateSubscribed: {
      type: DataTypes.DATE,
    },
    url: {
      type: DataTypes.VIRTUAL,
      get() {
        return `/subscriber/${this.id}`;
      },
    },
  });

  Subscriber.associate = function (models) {
    Subscriber.belongsTo(models.User);
  };

  return Subscriber;
};
