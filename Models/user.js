module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    uid: {
      type: DataTypes.STRING,
    },
    photoURL: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.VIRTUAL,
      get() {
        return `/user/${this.id}`;
      },
    },
  });

  User.associate = function (models) {
    User.hasMany(models.Video);
    User.hasMany(models.Comment);
    User.hasMany(models.CommentReplies);
    User.hasMany(models.Subscription);
    User.hasMany(models.Subscriber);
  };

  return User;
};
