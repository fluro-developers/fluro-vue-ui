

let templates = [];

//////////////////////////////////


templates.push({
    title: 'Basic Text Field',
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
    title: 'Multiple Choice',
    description: `Add a select dropdown where the user can choose an option from a list`,
    field: {
        title: '',
        minimum: 0,
        maximum: 1,
        askCount: 1,
        type: 'string',
        key: '',
        directive:'select',
        allowedValues:[
            'Option One',
            'Option Two',
            'Option Three',
            'Option Four',
        ],

    }
});


templates.push({
    title: 'Person',
    key:'person',
    description: `Add a new Contact Reference Field including the basic details (First Name, Last Name etc..)`,
    field: {
        title: '',
        minimum: 1,
        maximum: 1,
        askCount: 1,
        type: 'reference',
        directive: 'embedded',
        key: '',
        params: {
            restrictType: 'contact',
        },
        fields: [{
                title: 'Names',
                type: 'group',
                key: 'names',
                sameLine: true,

                fields: [{
                        title: 'First Name',
                        minimum: 1,
                        maximum: 1,
                        key: 'firstName',
                        type: 'string',

                    },
                    {
                        title: 'Last Name',
                        minimum: 1,
                        maximum: 1,
                        key: 'lastName',
                        type: 'string',

                    },
                ]
            },
            {
                title: 'Gender',
                minimum: 1,
                maximum: 1,
                key: 'gender',
                type: 'string',
                directive: 'select',

                options: [{
                        name: 'Male',
                        value: 'male',
                    },
                    {
                        name: 'Female',
                        value: 'female',
                    },
                    {
                        name: `I'd prefer not to say`,
                        value: 'unknown',
                    }
                ]
            },
            {
                title: 'Date of Birth',
                minimum: 1,
                maximum: 1,
                key: 'dob',
                type: 'date',
                directive: 'date-select',

            },
            {
                title: 'Email / Phone',
                key: 'contactoptions',
                type: 'group',
                sameLine: true,

                fields: [{
                        title: 'Email Address',
                        minimum: 1,
                        maximum: 1,
                        key: 'email',
                        type: 'email',

                    },
                    {
                        title: 'Phone Number',
                        minimum: 1,
                        maximum: 1,
                        key: 'phoneNumber',
                        type: 'string',

                    },
                ]
            }
        ]

    },
})



templates.push({
    title: 'Family Household / Address',
    description: `Add a new Family Household Reference Field including address, suburb etc`,
    field: {
        title: 'Family Household / Address',
        minimum: 1,
        maximum: 1,
        askCount: 1,
        type: 'reference',
        directive: 'embedded',
        key: 'family',
        params: {
            restrictType: 'family',
        },
        fields: [{
                title: 'Address',
                asObject: true,
                minimum: 1,
                maximum: 1,
                askCount: 1,
                type: 'group',
                key: 'address',

                fields: [{
                        key: 'header',
                        title: 'Heading',
                        minimum: 0,
                        maximum: 1,
                        type: 'void',

                        directive: 'custom',
                        template: '<h5>Address</h5>',
                    },
                    {
                        title: 'Address Line 1',
                        minimum: 1,
                        maximum: 1,
                        key: 'addressLine1',
                        type: 'string',

                    },
                    {
                        title: 'Address Line 2',
                        minimum: 0,
                        maximum: 1,
                        key: 'addressLine2',
                        type: 'string',

                    },
                    {
                        title: 'Suburb/State/Postcode',
                        minimum: 1,
                        maximum: 1,
                        key: 'ssp',
                        type: 'group',

                        sameLine: true,
                        fields: [{
                                title: 'Suburb',
                                minimum: 0,
                                maximum: 1,
                                key: 'suburb',
                                type: 'string',

                            },
                            {
                                title: 'State',
                                minimum: 0,
                                maximum: 1,
                                key: 'state',
                                type: 'string',

                            },
                            {
                                title: 'Postal / Zip Code',
                                minimum: 0,
                                maximum: 1,
                                key: 'postalCode',
                                type: 'string',

                            }
                        ],
                    },
                ]
            },
            {
                key: 'samePostal',
                title: 'Postal Address is the same',
                minimum: 0,
                maximum: 1,
                type: 'boolean',
                defaultValues: [true],

            },
            {
                title: 'Postal Address',
                asObject: true,
                minimum: 1,
                maximum: 1,
                askCount: 1,
                type: 'group',
                key: 'postalAddress',

                expressions: {
                    hide: 'model.samePostal',
                },
                fields: [{
                        key: 'header',
                        title: 'Heading',
                        minimum: 0,
                        maximum: 1,
                        type: 'void',

                        directive: 'custom',
                        template: '<h5>Postal Address</h5>',
                    },

                    {
                        title: 'Address Line 1',
                        minimum: 1,
                        maximum: 1,
                        key: 'addressLine1',
                        type: 'string',

                    },
                    {
                        title: 'Address Line 2',
                        minimum: 0,
                        maximum: 1,
                        key: 'addressLine2',
                        type: 'string',

                    },
                    {
                        title: 'Suburb/State/Postcode',
                        minimum: 1,
                        maximum: 1,
                        key: 'ssp',
                        type: 'group',

                        sameLine: true,
                        fields: [{
                                title: 'Suburb',
                                minimum: 0,
                                maximum: 1,
                                key: 'suburb',
                                type: 'string',

                            },
                            {
                                title: 'State',
                                minimum: 0,
                                maximum: 1,
                                key: 'state',
                                type: 'string',

                            },
                            {
                                title: 'Postal / Zip Code',
                                minimum: 0,
                                maximum: 1,
                                key: 'postalCode',
                                type: 'string',

                            }
                        ],
                    },
                ]
            },

        ]

    },
})


templates.push({
    title: 'Heading',
    description: `Add a custom heading or html markup`,
    field: {
        title: 'My Heading',
        description: 'This is the description',
        minimum: 1,
        maximum: 1,
        type: 'void',
        directive: 'custom',
        key: 'heading',
        template: `<h3>{{field.title}}</h3>\n<p>{{field.description}}</p>`,
    },
    params: {},
})


templates.push({
    title: 'Video',
    description: `Add a video embed`,
    field: {
        title: 'My Video',
        description: 'This is a video',
        minimum: 1,
        maximum: 1,
        type: 'void',
        directive: 'custom',
        key: 'videoItem',
        template: `<h3>{{field.title}}</h3>\n
                    <p>{{field.description}}</p>\n
                    <div style="width:100%; position:relative; height:0; padding-bottom:56.25%;">\n<iframe style="width:100%; height:100%; position: absolute; top:0; right:0; bottom:0; left:0; " src="https://www.youtube.com/embed/iJ1ynQ46984" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>\n</div>\n
                    `,
    },
    params: {},
})


templates.push({
    title: 'Signature',
    description: `Request the user to write their signature`,
    field: {
        title: 'Signature',
        description: 'Please sign your name',
        minimum: 1,
        maximum: 1,
        type: 'string',
        directive: 'signature',
        key: 'signature',
    },
    params: {},
})

templates.push({
    title: 'File Upload',
    description: `Add a video, asset, or image upload field`,
    field: {
        title: 'Upload Image',
        description: 'Select your image/s to upload',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        directive: 'upload',
        params:{
            restrictType:'image'
        },
        key: 'upload',
    },
    params: {},
})

templates.push({
    title: 'Website link',
    description: `Add a link to an external URL`,
    field: {
        title: 'External Link',
        minimum: 1,
        maximum: 1,
        type: 'void',
        directive: 'custom',
        key: 'link',
        template: '<a target="_blank" href="https://www.fluro.io">Click here to view the link</a>',
    },
    params: {},
})



export default templates;