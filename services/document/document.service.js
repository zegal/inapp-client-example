const Document = require("../../models/document.model");
const postDocument = docData => {
  const document = new Document(docData);
  return document.save();
};
const getAllDocuments = () => {
  return Document.find().exec();
};
module.exports = { postDocument, getAllDocuments };
