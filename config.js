require('dotenv').config();
const ENV = process.env;

module.exports = {
  mongo: {
    URI: "mongodb://" +
      ENV.MONGO_AMITY_USERNAME + ":" +
      ENV.MONGO_AMITY_PASSWORD + "@" +
      ENV.MONGO_PATH + ":" +
      ENV.MONGO_PORT + "/" +
      ENV.MONGO_DB_NAME,
  },
};

