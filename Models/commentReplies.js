module.exports = (sequelize, DataTypes) => {
  const CommentReplies = sequelize.define("CommentReplies", {
    likes: {
      type: DataTypes.INTEGER,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    time: {
      type: DataTypes.DATE,
    },
    url: {
      type: DataTypes.VIRTUAL,
      get() {
        return `/subscriber/${this.id}`;
      },
    },
  });

  CommentReplies.associate = function (models) {
    CommentReplies.belongsTo(models.Comment);
    CommentReplies.belongsTo(models.User);
  };

  return CommentReplies;
};
