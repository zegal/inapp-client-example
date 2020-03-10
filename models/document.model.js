"use strict";
var mongoose = require("mongoose");

var Document = mongoose.Schema(
  {
    title: { type: String, required: true },
    json: { type: mongoose.Schema.Types.Mixed },
  },
  {
    _id: true,
    timestamps: true,
    collection: "documents",
  }
);

module.exports = mongoose.model("Document", Document);
