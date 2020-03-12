let doctypePayload = {
	doctype: "5e5f3ade436e69c4ad043b0b",
	guide: "5db157dd545208010092943a",
}
let options = {}
let user = {
	access: {
		type: "view",
		invited: false
	},
	primary_name: {
		given_name: "",
		surname: ""
	},
	signature: {invoked: true },//signers
	email: "",
	role: "member",
}
async function createDocumentHandler() {
	user = {
		...user,
		primary_name: {
			given_name: document.getElementById("given_name").value,
			surname: document.getElementById("surname").value
		},
		email: document.getElementById("email").value
	}
	doctypePayload = {
		...doctypePayload,
		title: document.getElementById("docTitle").value || 'New document',
		users: document.getElementById('addSigners').checked ? [user]: []
	}
	options = {
		disableSignerAdd: !document.getElementById('addSigners').checked,
		disablePreview: !document.getElementById('enablePreview').checked,
		disableDownload: !document.getElementById('enableDownload').checked
	}
	
	document.getElementById('modalTitle').innerHTML = doctypePayload.title
	await zegal.createDocument(doctypePayload, options)
};


const selectDoctype = (id) => {
	doctypePayload.doctype = id
}