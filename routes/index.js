var express = require("express");
var router = express.Router();
const DocumentService = require("../services/document/document.service");

/* GET home page. */
router.get("/", async function(req, res, next) {
  const documents = await DocumentService.getAllDocuments();

  res.render("index", {
    title: "API Portal",
    zegalClient: process.env.ZEGAL_CLIENT,
    key: process.env.CLIENT_KEY,
    signers: [],
    documents
  });
});

module.exports = router;
