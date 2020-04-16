"use strict";
const mongoose = require("mongoose");

const Document = mongoose.Schema(
  {
    title: { type: String, required: true },
    doctype: { type: String, required: true },
    description: { type: String },
    data: { type: mongoose.Schema.Types.Mixed },
    state: { type: String },
    owner: { type: String },
    v: { type: String },
    key_id: { type: String },
    document_id: { type: String },
    type: { type: String },
    collaborators: [
      {
        name: {
          given_name: { type: String },
          surname: { type: String },
        },
        role: { type: String },
        email: { type: String },
      },
    ],
    signers: [
      {
        key: { type: String },
        email: { type: String },
        party_name: { type: String },
        primary_name: {
          given_name: { type: String },
          surname: { type: String },
        },
        role: { type: String },
        status: { type: String },
        signature: mongoose.Schema.Types.Mixed,
      },
    ],
    docx: { type: String },
    pdf: { type: String },
    docxPointer: { type: String },
    pdfPointer: { type: String },
  },
  {
    _id: true,
    timestamps: true,
    collection: "documents",
  }
);

module.exports = mongoose.model("Document", Document);
