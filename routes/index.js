var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", async function(req, res, next) {
  res.render("index", {
    title: "API Portal",
    zegalClient: process.env.ZEGAL_CLIENT,
    key: process.env.CLIENT_KEY,
    signers: []
  });
});

module.exports = router;
