require("dotenv").config();

module.exports = {
  HOST: process.env.PSQL_HOST,
  USER: process.env.PSQL_USER,
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
