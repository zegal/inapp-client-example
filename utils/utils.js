let doctypePayload = {
	doctype: "",
	guide: "",
	// doctype: "5e5f3ade436e69c4ad043b0b",
	// guide: "5db157dd545208010092943a",
}
let options = {}
let users = [{
	access: {
		type: "view",
		invited: false
	},
	primary_name: {
		given_name: "",
		surname: ""
	},
	signature: {invoked: true },//signers
	email: '',
	signing_as: '',
	party: ''
}]

let zegal
let doctypes
async function initialize(key) {
	zegal =  new Zegal(key);
	await zegal.init();
	getGuideCategories();
}

const toSnakeCase = (str) => {
	if(str) {
		const match = str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
		if(match) {
			return match
				.map(x => x.toLowerCase())
				.join('_');
		}
	}
}

async function getGuideCategories() {
	let guideCats = await zegal.getGuideCategories();
	let accordion = $('#accordion')
	guideCats = Array.from(guideCats)
	
	guideCats.map((guideCat) => {
		accordion.append($(`
			<div class="card">
				<div class="card-header" id="cat${toSnakeCase(guideCat.name)}">
					<h5 class="mb-0">
						<button role="button" class="btn btn-link collapsed" data-toggle="collapse" data-target="#${toSnakeCase(guideCat.name)}" aria-expanded="false"
							aria-controls="${toSnakeCase(guideCat.name)}">
							${guideCat.name}
						</button>
					</h5>
				</div>
			
				<div id="${toSnakeCase(guideCat.name)}" class="collapse card-body" aria-labelledby="cat${toSnakeCase(guideCat.name)}" data-parent="#accordion">
				</div>
			</div>
		`))
		
		const guideCatDiv = $(`#${toSnakeCase(guideCat.name)}`)
		guideCat.guides.map((guide) => {
			guideDiv = $(`<button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true"
									aria-expanded="false" name='${guide.name}'>${guide.name}</button>`);
			guideCatDiv.append(guideDiv)
			let doctypeList = $(`<div class="dropdown-menu"></div >`)
			guideDiv.on('click', (e) => {
				const selectedGuide = guideCat.guides.find((guide) => guide.name === e.target.name)
				doctypeList.empty()
				selectedGuide.doctypes.map((doctype) => {
					console.log(e.target.name, doctype.display_name)
					doctypes = $(`<button class="dropdown-item" href="#">${doctype.display_name}</button>`)
					doctypes.on('click', () => selectDoctype(guide._id, doctype.id, doctype.display_name));
	
					doctypeList.append(doctypes)
				})
	
				guideCatDiv.append(doctypeList)
			})
		})
	})
}

async function createDocumentHandler() {
	if(doctypePayload.guide) {
		$('#zegalButton').attr('data-target', "#createModal")
		doctypePayload = {
			...doctypePayload,
			title: document.getElementById("docTitle").value || 'New document',
			users: document.getElementById('addSignersInfo').checked ? users : []
		}
		options = {
			disableSignerAdd: !document.getElementById('enableAddSigners').checked,
			disablePreview: !document.getElementById('enablePreview').checked,
			disableDownload: !document.getElementById('enableDownload').checked,
			docCompletionButton: document.getElementById('docCompletionButton').value || 'Complete DBQ'
		}
		
		await zegal.createDocument(doctypePayload, options)
	} else {
		alert('Please select doctype');
		return
	}
};

let doctypeDetails
const selectDoctype = async(guideId, doctypeId, docName) => {
	doctypeDetails = await zegal.getDoctypeSample(doctypeId)
	
	document.getElementById("docTitle").value = docName
	doctypePayload.doctype = doctypeId
	doctypePayload.guide = guideId

	populatePartyOptions();
	$(window).scrollTop(0);
}

const populatePartyOptions = () => {
	const partySelect = $('.party_select')
	doctypeDetails.parties && doctypeDetails.parties.map((party) => {
		const option = $(`<option id='${party.id}'>${party.name}</option>`);
		partySelect.append(option)
	})
}

const updateSignerRoles = (e) => {
	const selectedParty = e.target.value
	const index = e.target.dataset.id // get targeted user index
	const party = doctypeDetails.parties.find((party) => party.name === selectedParty)
	const roleSelect = $(`#signing_as${index}`)
	const user = users[index]
	// set selected signer party to user
	user[e.target.name] = $(`#${e.target.id} :selected`).text()

	roleSelect.on('change', (e) => {
		const user = users[e.target.dataset.id]
		// set selected signer role to user
		user[e.target.name] = $(`#${e.target.id} :selected`).text()
	});
	party.signingRoles.map((role) => {
		const option = $(`<option>${role}</option>`);
		roleSelect.append(option)
	})
}

const populateSigners = () => {
	const signersBlock = $('#signersBlock')
	users.map((user, i) => {
		const signer = $(`
							<form class="col-11" id='form${i}'>
								<div class="form-group">
									<input type="text" class="form-control" id="given_name${i}" placeholder='First name' value='${user.primary_name.given_name}' onchange='updatePrimaryName(${i}, "given_name")'>
								</div>
								<div class="form-group">
									<input type="text" class="form-control" id="surname${i}" placeholder='Last name' value='${user.primary_name.surname}' onchange='updatePrimaryName(${i}, "surname")'>
								</div>
								<div class="form-group">
									<input type="email" class="form-control" id="email${i}" placeholder='Email' value='${user.email}' onchange='updateUser(${i}, "email")'>
								</div>
								<select class="form-group form-control party_select" id="party${i}" value='${user.party}' name='party' data-id='${i}'>
									<option>Select signer party</option>
								</select>
								<select class="form-group form-control role_select" id="signing_as${i}" value='${user.signing_as}' name='signing_as', data-id='${i}'>
									<option>Select signer role</option>	
								</select>
								<hr/>
							</form>
						`)
		signersBlock.append(signer);
		if (doctypePayload.doctype) {
			populatePartyOptions()
		}

		$(`#party${i}`).change(function (e) {
			updateSignerRoles(e)
		});

		user.party && $(`#party${i}`).append(`<option selected>${user.party}</option>`)
		user.signing_as && $(`#signing_as${i}`).append(`<option selected>${user.signing_as}</option>`)

	})
}
const addSignerForm = () => {
	const signersBlock = $('#signersBlock')
	signersBlock.empty()
	users.push({
		access: {
			type: "view",
			invited: false
		},
		primary_name: {
			given_name: "",
			surname: ""
		},
		signature: { invoked: true },//signers
		email: '',
		signing_as: '',
		party: ''
	})
	populateSigners()
}

const updatePrimaryName = (i, name) => {
	const user = users[i].primary_name
	user[name] = document.getElementById(`${name}${i}`).value
}
const updateUser = (i, name) => {
	const user = users[i]
	user[name] = document.getElementById(`${name}${i}`).value
}