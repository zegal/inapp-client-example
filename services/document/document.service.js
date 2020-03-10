const Document = require("../../models/document.model");
const postDocument = docData => {
  const document = new Document(docData);
  return document.save();
};
module.exports = { postDocument };
