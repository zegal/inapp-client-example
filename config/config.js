if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
} else if (process.env.NODE_ENV === "staging") {
  require("dotenv").config({ path: "staging.env" });
  console.log(process.env.MONGO_SERVER);
} else if (process.env.NODE_ENV === "production") {
  require("dotenv").config({ path: "prod.env" });
} else {
  // if node server is run without any given env, then load default env
  require("dotenv").config();
}
const env = process.env;

module.exports = {
  ...env,
};
