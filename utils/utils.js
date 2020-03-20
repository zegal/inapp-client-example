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

let zegal
let doctypes
async function initialize(key) {
	zegal =  new Zegal(key);
	await zegal.init();
	getDoctypes();
}

async function getDoctypes() {

	let guideCats = await zegal.getDoctypes();
	let doctypeChooser = $('#doctypeChooser')
	let guideChooser = $('#guidesMenu')
	let accordion = $('#accordion')
	guideCats.forEach((guideCat) => {
		// button = $(`<button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true"
		// 						aria-expanded="false">${guide.name}</button>`);
		// guideChooser.append(button)

		accordion.append($(`
			<button class="btn" data-toggle="collapse" data-target="#${guideCat._id}" aria-expanded="true"
			aria-controls="${guideCat._id}">
			${guideCat.name}
		</button>

		<div id="${guideCat._id}" class="collapse btn-group flex-column nav-pills" data-parent="#accordion">
			
		</div>
		`))
		const guideCatDiv = $(`#${guideCat._id}`)
		guideCat.guides.map((guide) => {

			guideDiv = $(`<button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true"
									aria-expanded="false">${guide.name}</button>`);
			guideCatDiv.append(guideDiv)
			const doctypeList = $(`<div class="dropdown-menu"></div >`)

			guide.doctypes.map((doctype) => {
				doctypes = $(`<button class="dropdown-item" href="#">${doctype.display_name}</button>`)
				doctypes.on('click', () => selectDoctype(guide._id, doctype.id, doctype.display_name));

				doctypeList.append(doctypes)
			})

			guideCatDiv.append(doctypeList)
		})
	})
}
// async function getDoctypes() {
// 	let doctypes = await zegal.getDoctypes();
// 	let doctypeChooser = $('#doctypeChooser')
// 	doctypes.forEach((guide) => {
// 		Object.entries(guide).forEach(([key, doctypes]) => {
// 			doctypes.map((doctype) => {
// 				button = $(`<button class="nav-link active" id="v-pills-home-tab" data-toggle="pill" role="tab" aria-controls="v-pills-home" aria-selected="true" onclick="selectDoctype(doctype.id)">${doctype.display_name}</button>`);
// 				button.on('click', () => selectDoctype(key, doctype.id, doctype.display_name));
// 				doctypeChooser.append(button)
// 			})
// 		})
// 	})
// }
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
		users: document.getElementById('addSignersInfo').checked ? [user]: []
	}
	options = {
		disableSignerAdd: !document.getElementById('enableAddSigners').checked,
		disablePreview: !document.getElementById('enablePreview').checked,
		disableDownload: !document.getElementById('enableDownload').checked
	}
	
	// document.getElementById('modalTitle').innerHTML = doctypePayload.title
	await zegal.createDocument(doctypePayload, options)
};


const selectDoctype = (guideId, doctypeId, docName) => {
	document.getElementById("docTitle").value = docName
	doctypePayload.doctype = doctypeId
	doctypePayload.guide = guideId
}