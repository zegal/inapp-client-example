const mongoose = require("mongoose");
const config = require("../config/config");

mongoose.connect(config.db.MONGO_SERVER_CONNECT_STR, {
  autoReconnect: true,
  reconnectTries: config.db.reconnectTries,
  reconnectInterval: config.db.reconnectInterval,
  useNewUrlParser: true,
});

const db = mongoose.connection;
// handling events
db.on("error", function(err) {
  // exit on error
  console.log(err, "Mongo connection error");
  process.exit(0);
});
db.on("connecting", function() {
  console.log("Connecting to MongoDB...");
});

db.on("connected", function() {
  console.log("Connected to MongoDB!");
});
db.on("reconnected", function() {
  console.log("MongoDB reconnected!");
});

db.on("disconnected", function() {
  console.log("MongoDB disconnected!");
});
