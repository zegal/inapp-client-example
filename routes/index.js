const express = require("express");
const router = express.Router();
const config = require("../config/config");
const DocumentService = require("../services/document/document.service");

/* GET home page. */
router.get("/", async function(req, res, next) {
  const documents = await DocumentService.getAllDocuments();
  res.render("index", {
    title: "API Portal",
    zegalClient: config.ZEGAL_CLIENT,
    key: "pk_8e367994-27df-43ee-8a16-f0fb1c513ce3",
    // key: config.CLIENT_KEY,
    signers: [],
    documents
  });
});

module.exports = router;
