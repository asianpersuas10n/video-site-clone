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
    Comment.hasMany(models.CommentReplies);
  };

  return Comment;
};
