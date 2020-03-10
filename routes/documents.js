const express = require("express");
const router = express.Router();

const DocumentService = require("../services/document/document.service");
/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.post("/", async function(req, res, next) {
  try {
    const document = req.body;
    const newDoc = await DocumentService.postDocument(document);
    res.status(200).send(newDoc);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

module.exports = router;
