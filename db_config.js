require("dotenv").config();

module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: process.env.PSQL_PASS,
  DB: "youtubedb",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
