module.exports = (sequelize, DataTypes) => {
  const Video = sequelize.define("Video", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    duration: {
      type: DataTypes.INTEGER,
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    fireURL: {
      type: DataTypes.STRING,
    },
    thumbnail: {
      type: DataTypes.STRING,
    },
    scrubImages: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    url: {
      type: DataTypes.VIRTUAL,
      get() {
        return `/video/${this.id}`;
      },
    },
  });

  Video.associate = function (models) {
    Video.belongsTo(models.User);
  };

  return Video;
};
