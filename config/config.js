require("dotenv").config();
let env = process.env
if (process.env.DEBUG_MODE === true || process.env.DEBUG_MODE === "true") {
  // in the deployment, we'll always use main env. this below is for local debug mode
  if (process.env.NODE_ENV === "development") {
    env = require("dotenv").config();
  } else if (process.env.NODE_ENV === "staging") {
    env = require("dotenv").config({ path: "staging.env" });
  } else if (process.env.NODE_ENV === "production") {
    env = require("dotenv").config({ path: "prod.env" });
  }
}
module.exports = {
  ...env,
};
