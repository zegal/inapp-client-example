let env

if (process.env.NODE_ENV === 'development') {
  env = require('dotenv').config();
} else if (process.env.NODE_ENV === 'staging') {
  env = require('dotenv').config({ path: 'staging.env' });
} else if (process.env.NODE_ENV === 'production') {
  env = require('dotenv').config({ path: 'prod.env' });
}
module.exports = {
  ...env.parsed,
};
