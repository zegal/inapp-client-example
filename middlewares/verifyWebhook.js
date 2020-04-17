const portal = require("@zegal/zegal-utils");
const config = require("../config/config");
async function verifyWebhook(req, res, next) {
  try {
    await portal.verifyWebhookEvent(
      JSON.stringify(req.body),
      req.headers["x-dragon-law-signature"],
      config.SECRET_KEY
    );
    next();
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}

module.exports = verifyWebhook;
