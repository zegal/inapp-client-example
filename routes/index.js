var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  const zegalDoctypes = [
    {
      id: "5e58aa64356286efc1eec974",
      display_name: "Cross Reference Testing Do not touch"
    },
    {
      id: "5e58dc44d3ebe66752107268",
      display_name: "agreement date testing"
    },
    {
      id: "5e5f3ade436e69c4ad043b0b",
      display_name: "All field type testing do not edit and save"
    },
  ]
  res.render("index", { title: "API Portal", zegalDoctypes });
});

module.exports = router;
