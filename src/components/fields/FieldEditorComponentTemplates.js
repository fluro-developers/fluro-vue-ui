let templates = [];

//////////////////////////////////


templates.push({
				title: 'Basic Field',
				description: `Add a basic text field`,
				field: {
								title: '',
								minimum: 0,
								maximum: 1,
								askCount: 1,
								type: 'string',
								key: '',
				}
});


templates.push({
				title: 'Background',
				description: `Add a background with tint option`,
				field: {
								title: 'Background',
								minimum: 1,
								maximum: 1,
								askCount: 1,
								type: 'group',
								asObject: true,
								key: 'background',
								fields: [
								{
												title: 'Image',
												key: 'image',
												type: 'reference',
												minimum:0,
												maximum:1,
												params: {
																restrictType: 'image',
												}
								},
								{
												title: 'Tint',
												key: 'tint',
												type: 'string',
												directive:'color',
												minimum:0,
												maximum:1,
												defaultValues:['#00000055'],
												expressions:{
													hide:'!model.image',
												}
								},
								]
				}
});

templates.push({
				title: 'Button',
				description: `Add a set of buttons/links`,
				field: {
								title: 'Button',
								minimum: 0,
								maximum: 0,
								askCount: 1,
								asObject: true,
								type: 'group',
								key: 'button',
								fields: [{
																title: 'Text',
																minimum: 1,
																maximum: 1,
																type: 'string',
																key: 'text',
																defaultValues: ['Find Out More']
												},
												{
																title: 'Link to',
																minimum: 1,
																maximum: 1,
																type: 'string',
																key: 'type',
																directive: 'select',
																options: [{
																								title: 'Page',
																								value: 'page',
																				},
																				{
																								title: 'External URL',
																								value: 'url',
																				},
																],
																defaultValues: ['page']
												},
												{
																title: 'Page',
																minimum: 1,
																maximum: 1,
																type: 'string',
																key: 'page',
																directive: 'app-page-select',
																expressions: {
																				hide: `model.type != 'page'`,
																}
												},
												{
																title: 'URL',
																minimum: 1,
																maximum: 1,
																type: 'url',
																key: 'url',
																expressions: {
																				hide: `model.type != 'url'`,
																}
												},
												{
																title: 'Open in',
																minimum: 0,
																maximum: 1,
																type: 'string',
																key: 'window',
																directive: 'select',
																options: [{
																								title: 'Same Window',
																								value: '',
																				},
																				{
																								title: 'New Window',
																								value: '_blank',
																				},
																],
																expressions: {
																				hide: `model.type != 'url'`,
																}
												},


												{
																title: 'Style',
																minimum: 1,
																maximum: 1,
																askCount: 1,
																asObject: true,
																type: 'group',
																key: 'style',

																fields: [{
																				title: 'Button Style Options',
																				type: 'group',
																				key: 'styleOptions',
																				sameLine: true,
																				fields: [{
																												title: 'Size',
																												minimum: 0,
																												maximum: 1,
																												type: 'string',
																												key: 'size',
																												directive: 'app-size-select',
																								},
																								{
																												title: 'Type',
																												minimum: 0,
																												maximum: 1,
																												type: 'string',
																												key: 'type',
																												directive: 'select',
																												options: [{
																																				title: 'Standard',
																																				value: '',
																																},
																																{
																																				title: 'Outline',
																																				value: 'outline',
																																},
																																{
																																				title: 'Link',
																																				value: 'link',
																																},
																												],
																								},
																								{
																												title: 'Style',
																												minimum: 0,
																												maximum: 1,
																												type: 'string',
																												key: 'style',
																												directive: 'select',
																												defaultValues: ['default'],
																												options: [{
																																				title: 'Default',
																																				value: 'default',
																																},
																																{
																																				title: 'Danger',
																																				value: 'danger',
																																},
																																{
																																				title: 'Success',
																																				value: 'success',
																																},
																												],
																								},

																				],
																}],

												},

												{
																title: 'Icon',
																minimum: 1,
																maximum: 1,
																askCount: 1,
																asObject: true,
																type: 'group',
																key: 'icon',
																sameLine: true,
																fields: [{
																				title: 'Icon Options',
																				type: 'group',
																				key: 'iconOptions',
																				sameLine: true,
																				fields: [{
																												title: 'Icon',
																												minimum: 0,
																												maximum: 1,
																												type: 'string',
																												key: 'icon',
																												directive: 'app-icon-select',
																												defaultValues: ['angle-right'],
																								},
																								{
																												title: 'Icon Library',
																												minimum: 0,
																												maximum: 1,
																												type: 'string',
																												key: 'library',
																												directive: 'select',
																												options: [{
																																				title: 'Solid',
																																				value: 'fas',
																																},
																																{
																																				title: 'Regular',
																																				value: 'far',
																																},
																																{
																																				title: 'Brands / Logos',
																																				value: 'fab',
																																},
																																{
																																				title: 'Thin',
																																				value: 'fal',
																																}
																												],
																												defaultValues: ['fas'],
																								},
																								{
																												title: 'Icon Position',
																												minimum: 0,
																												maximum: 1,
																												type: 'string',
																												key: 'position',
																												directive: 'select',
																												options: [{
																																				title: 'Left',
																																				value: 'left',
																																},
																																{
																																				title: 'Right',
																																				value: 'right',
																																}
																												],
																												defaultValues: ['right'],
																								},
																				],
																}],

												},

								]
				}
});




export default templates;
