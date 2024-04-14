module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comment", {
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

  Comment.associate = function (models) {
    Comment.belongsTo(models.User);
    Comment.belongsTo(models.Video);
    Comment.hasMany(Comment, {
      foreignKey: "commentRepliesID",
      as: "headComment",
      sourceKey: "id",
    });
    Comment.belongsTo(Comment, {
      foreignKey: "commentRepliesID",
      as: "commentReplies",
      sourceKey: "id",
    });
  };

  return Comment;
};
