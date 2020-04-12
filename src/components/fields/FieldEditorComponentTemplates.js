

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
    title: 'Button',
    description: `Add a set of buttons/links`,
    field: {
        title: 'Button',
        minimum: 0,
        maximum: 0,
        askCount: 1,
        asObject:true,
        type: 'group',
        key: 'button',
        fields:[
        {
            title: 'Text',
            minimum: 1,
            maximum: 1,
            type: 'string',
            key: 'text',
            defaultValues:['Find Out More']
        },
        {
            title: 'Link to',
            minimum: 1,
            maximum: 1,
            type: 'string',
            key: 'type',
            directive:'select',
            options:[
            {
                title:'Page',
                value:'page',
            },
            {
                title:'External URL',
                value:'url',
            },
            ],
            defaultValues:['page']
        },
        {
            title: 'Page',
            minimum: 1,
            maximum: 1,
            type: 'string',
            key: 'page',
            directive:'app-page-select',
            expressions:{
                hide:`model.type != 'page'`,
            }
        },
        {
            title: 'URL',
            minimum: 1,
            maximum: 1,
            type: 'url',
            key: 'url',
            expressions:{
                hide:`model.type != 'url'`,
            }
        },
        {
            title: 'Open in',
            minimum: 0,
            maximum: 1,
            type: 'string',
            key: 'window',
            directive:'select',
            options:[
            {
                title:'Same Window',
                value:'',
            },
            {
                title:'New Window',
                value:'_blank',
            },
            ],
            expressions:{
                hide:`model.type != 'url'`,
            }
        },


        ]
    }
});




export default templates;