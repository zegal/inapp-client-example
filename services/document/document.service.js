const Document = require("../../models/document.model");
const postDocument = docData => {
  const document = new Document(docData);
  console.log(document, "document getting saved");
  return document.save();
};
const getAllDocuments = () => {
  return Document.find().exec();
};
module.exports = { postDocument, getAllDocuments };
