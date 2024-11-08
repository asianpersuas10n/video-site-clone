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
    User.hasMany(models.Video, {
      foreignKey: "uploadedVideoID",
      as: "uploadedVideo",
    });

    User.hasMany(models.Video, { foreignKey: "likesID", as: "likes" });
    User.hasMany(models.Video, { foreignKey: "dislikesID", as: "dislikes" });
    User.belongsTo(models.Comment);
    User.hasMany(User, {
      foreignKey: "subscriber",
      as: "subscribers",
      sourceKey: "id",
    });
    User.belongsTo(User, {
      foreignKey: "subscriber",
      as: "subscription",
      targetKey: "id",
    });
  };

  return User;
};
