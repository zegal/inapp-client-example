const mongoose = require("mongoose");
const config = require("../config/config");

// to fix all deprecation warnings: https://mongoosejs.com/docs/deprecations.html
mongoose.connect(config.MONGO_SERVER, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true, // http://mongodb.github.io/node-mongodb-native/3.3/reference/unified-topology/
});

const db = mongoose.connection;
// handling events
db.on("error", function (err) {
  // exit on error
  console.log(err, "Mongo connection error");
  process.exit(0);
});
db.on("connecting", function () {
  console.log("Connecting to MongoDB...");
});

db.on("connected", function () {
  console.log("Connected to MongoDB!");
});
db.on("reconnected", function () {
  console.log("MongoDB reconnected!");
});

db.on("disconnected", function () {
  console.log("MongoDB disconnected!");
});