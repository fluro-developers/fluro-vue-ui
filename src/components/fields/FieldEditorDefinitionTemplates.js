let templates = [];

//////////////////////////////////

templates.push({
	title: 'Basic Field',
	description: `Add a basic field that you can customise`,
	field: {
		title: '',
		minimum: 0,
		maximum: 1,
		askCount: 1,
		type: 'string',
		directive: 'input',
		key: '',
	},
});

templates.push({
	title: 'Date Field',
	description: `Add a basic date field`,
	field: {
		title: '',
		minimum: 0,
		maximum: 1,
		askCount: 1,
		type: 'date',
		directive: 'datetime-select',
		key: 'date',
	},
});

templates.push({
	title: 'Multiple Choice',
	description: `Add a select dropdown where the user can choose an option from a list`,
	field: {
		title: '',
		minimum: 0,
		maximum: 1,
		askCount: 1,
		type: 'string',
		key: '',
		directive: 'select',
		options: [
			{ name: 'Option One', value: 'Option One' },
			{ name: 'Option Two', value: 'Option Two' },
			{ name: 'Option Three', value: 'Option Three' },
			{ name: 'Option Four', value: 'Option Four' },
		],
	},
});

templates.push({
	title: 'File Reference',
	description: `Add an asset attachment field`,
	field: {
		title: 'Attachments',
		description: 'Create or select your files',
		minimum: 0,
		maximum: 0,
		type: 'reference',
		params: {
			restrictType: 'asset',
		},
		key: 'attachments',
	},
	params: {},
});

export default templates;
