"use strict";
var mongoose = require("mongoose");

var Document = mongoose.Schema(
  {
    title: { type: String, required: true },
    docxPointer: { type: String },
    pdfPointer: { type: String },
    signers: [
      {
        _id: { type: String },
        key: { type: String }, // Signature Key to store in DocumentSignature Schema
        party: { type: String }, // Id of party from doctype
        email: { type: String },
        type: { type: String }, // Signers type -> [DEFAULT_TYPE, PRIMARY_TYPE, COUNTER_TYPE, LEGACY_TYPE]
        party_name: { type: String }, // Name of party from doctype
        primary_name: {
          given_name: { type: String },
          surname: { type: String },
        },
        role: { type: String },
        phrase: { type: String },
        invited_at: { type: String },
        signing_information: { type: String },
        note: [{ message: { type: String }, _id: { type: String } }],
        decline_note: [{ message: { type: String }, _id: { type: String } }],
        status: { type: String },
        signature: mongoose.Schema.Types.Mixed,
      },
    ],
    state: { type: String },
    owner: { type: String },
    org: { type: String },
    data: { type: mongoose.Schema.Types.Mixed },
  },
  {
    _id: true,
    timestamps: true,
    collection: "documents",
  }
);

module.exports = mongoose.model("Document", Document);
