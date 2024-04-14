module.exports = (sequelize, DataTypes) => {
  const Subscription = sequelize.define("Subscription", {
    uid: {
      type: DataTypes.STRING,
    },
    videoID: {
      type: DataTypes.STRING,
    },
    dateSubscribed: {
      type: DataTypes.DATE,
    },
    url: {
      type: DataTypes.VIRTUAL,
      get() {
        return `/subscription/${this.id}`;
      },
    },
  });
  /*
  Subscription.associate = function (models) {
    Subscription.belongsTo(models.User);
  };
*/
  return Subscription;
};
