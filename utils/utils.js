async function createDocumentHandler() {
	const doctypePayload = {
		doctype: "5e5f3ade436e69c4ad043b0b",
		guide: "5db157dd545208010092943a",
		title: document.getElementById("docTitle").value || 'New document',
	}
	await zegal.createDocument(doctypePayload)
};