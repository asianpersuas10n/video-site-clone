const dbConfig = require("../db_config.js");

const { DataTypes, Sequelize } = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.User = require("./user.js")(sequelize, DataTypes);
db.Video = require("./videos.js")(sequelize, DataTypes);
db.Subscriber = require("./subscribers.js")(sequelize, DataTypes);
db.Subscription = require("./subscriptions.js")(sequelize, DataTypes);
db.Comment = require("./comments.js")(sequelize, DataTypes);
db.CommentReplies = require("./commentReplies.js")(sequelize, DataTypes);

db.Sequelize = DataTypes;
db.sequelize = sequelize;

Object.keys(db).forEach(function (modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

sequelize.sync({ alter: true });

module.exports = db;
