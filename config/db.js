module.exports = {
  db: {
    MONGO_SERVER_CONNECT_STR:
      process.env.MONGO_SERVER_CONNECT_STR ||
      "mongodb://127.0.0.1:27017/apiportal",
    reconnectTries: process.env.dbReconnectTries || Number.MAX_VALUE,
    reconnectInterval: process.env.dbReconnectInterval || 1000,
  },
};
