const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
var MiniCssExtractPlugin = require('mini-css-extract-plugin')


module.exports = {
    // runtimeCompiler: true,
    entry: './src/index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
    },
    externals: {
        'vue': 'vue',
        'lodash': 'lodash',
        'brace': 'brace',
        'fluro': 'fluro',
        'vue-color': 'vue-color',
        'vuetify': 'vuetify',
        'signature_pad': 'signature_pad',
        'js-beautify': 'js-beautify',
        'vue2-ace-editor': 'vue2-ace-editor',
        'vuedraggable': 'vuedraggable',
        'fluro-vue': 'fluro-vue',
        'vuex-map-fields': 'vuex-map-fields',
        'prosemirror-commands': 'prosemirror-commands',
        'prosemirror-state': 'prosemirror-state',
        'prosemirror-view': 'prosemirror-view',

        '@fortawesome/vue-fontawesome':'@fortawesome/vue-fontawesome',
        '@fortawesome/pro-solid-svg-icons':'@fortawesome/pro-solid-svg-icons',
        '@fortawesome/pro-regular-svg-icons':'@fortawesome/pro-regular-svg-icons',
        '@fortawesome/fontawesome-svg-core':'@fortawesome/fontawesome-svg-core',


        "tippy.js": "tippy.js",
        'tiptap': 'tiptap',
        "tiptap-commands": "tiptap-commands",
        "tiptap-extensions": "tiptap-extensions",
        "tiptap-utils": "tiptap-utils",


        //Brace Stuff
        'brace/ext/language_tools': 'brace/ext/language_tools',
        'brace/ext/searchbox': 'brace/ext/searchbox',
        'brace/mode/html': 'brace/mode/html',
        'brace/mode/json': 'brace/mode/json',
        'brace/mode/javascript': 'brace/mode/javascript',
        'brace/mode/ejs': 'brace/mode/ejs',
        'brace/mode/scss': 'brace/mode/scss',
        'brace/theme/tomorrow_night_eighties': 'brace/theme/tomorrow_night_eighties',
        'brace/snippets/javascript': 'brace/snippets/javascript',
        'brace/theme/chrome': 'brace/theme/chrome',
    },
    module: {



        rules: [

            /**
            {
                test: /\.(s*)css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // 'vue-style-loader',
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' },

                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: [
                                './src/variables.scss',
                            ]
                        },
                    },
                ]
            },
            /**/
            /**/
            {
                // test: /\.(scss|sass|css)$/,

                test: /\.(s*)css$/,
                use: [
                   


                    'vue-style-loader',
                    'css-loader',
                    'sass-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: [
                                './src/variables.scss',
                            ]
                        },
                    },
                    
                ],
            }, 

            /**/
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            // this will apply to both plain `.js` files
            // AND `<script>` blocks in `.vue` files
            {
                test: /\.js$/,
                loader: 'babel-loader',
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        // new MiniCssExtractPlugin({
        //     filename: 'EXTRACTED.css',
        //     chunkFilename: "[name].css"
        // })
    ],


    optimization: {
        splitChunks: {
           
            cacheGroups: {
                styles: {
                    name: 'styles',
                     test: /\.(s*)css$/,
                    // test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
    },

};




// module.exports = {
//   // other options...
//   module: {
//     rules: [
//       // ... other rules omitted
//       {
//         test: /\.css$/,
//         use: [
//           process.env.NODE_ENV !== 'production'
//             ? 'vue-style-loader'
//             : MiniCssExtractPlugin.loader,
//           'css-loader'
//         ]
//       }
//     ]
//   },
//   plugins: [
//     // ... Vue Loader plugin omitted
//     new MiniCssExtractPlugin({
//       filename: 'style.css'
//     })
//   ]
// }
