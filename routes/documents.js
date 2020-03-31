const express = require("express");
const router = express.Router();

const DocumentService = require("../services/document/document.service");

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

router.get("/", async function(req, res, next) {
  try {
    const documents = await DocumentService.getAllDocuments();
    res.render("document", { documents,
      title: "API portal - Documents",
    });
  } catch (err) {
    console.log(err);
    res.render("error", err);
    res.status(400).send(err);
  }
});
module.exports = router;
