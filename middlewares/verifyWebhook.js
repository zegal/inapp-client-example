const portal = require("@zegal/apiportal-utils");
async function verifyWebhook(req, res, next) {
  try {
    await portal.verifyWebhookEvent(
      req.body,
      req.headers["X-Dragon-Law-Signature"],
      process.env.SECRET_KEY
    );
    next();
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}

module.exports = verifyWebhook;
