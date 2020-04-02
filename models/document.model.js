"use strict";
var mongoose = require("mongoose");

var Document = mongoose.Schema(
  {
    title: { type: String, required: true },
    docxPointer: { type: String },
    pdfPointer: { type: String },
    signers: { type: mongoose.Schema.Types.Mixed },
    state: { type: String },
    owner: { type: String },
    org: { type: String },
  },
  {
    _id: true,
    timestamps: true,
    collection: "documents",
  }
);

module.exports = mongoose.model("Document", Document);
