async function createDocumentHandler() {
	const doctypePayload = {
		doctype: "5e439341a4cb1c531292ca7b",
		guide: "5db157dd545208010092943a",
		title: document.getElementById("docTitle").value || 'New document',
	}
	await zegal.createDocument(doctypePayload)
};