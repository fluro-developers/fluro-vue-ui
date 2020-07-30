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
        rules: [{
                test: /\.(s*)css$/,
                use: [
                    // 
                    /**
                    //Uncomment this to build for website builder

                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: './dev', // path.join(__dirname, './dev')
                        }
                    },
                    /**/

                    
                    // { loader: 'css-loader', options: { url: false, sourceMap: false } },
                    // { loader: 'sass-loader', options: { sourceMap: false } }

                    /**/
                    'vue-style-loader',
                    // MiniCssExtractPlugin.loader,
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
            }, {
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
        // new VuetifyLoaderPlugin(),
        // ... Vue Loader plugin omitted
        new MiniCssExtractPlugin({
            filename: "../extracted/flurovueui.css",
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
    },

};
