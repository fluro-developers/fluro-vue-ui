const path = require('path');
// var JsDocPlugin = require('jsdoc-webpack-plugin-v2');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');


module.exports = {
    // runtimeCompiler: true,
    entry: './src/index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
    },
    // output: {
    //     path: path.join(__dirname, "dist"),
    //     filename: "index.js",
    //     // library: ["fluro-vue-ui"],
    //     // libraryTarget: "umd"
    // },

    // output: {
    //     path: path.join(__dirname, "dist"),
    //     //library: 'fluro-vue-ui',

    //     libraryTarget: 'umd',
    //     // globalObject: 'this',
    // },

    externals: {
        'lodash':'lodash',
        'fluro':'fluro',
        'vue': 'vue',
        'brace': 'brace',
        'vue-color': 'vue-color',
        'vuetify': 'vuetify',
        'signature_pad': 'signature_pad',
        'js-beautify': 'js-beautify',
        'vue2-ace-editor': 'vue2-ace-editor',
        'vuedraggable': 'vuedraggable',
        'vuex-map-fields': 'vuex-map-fields',
        "tippy.js": "tippy.js",
        "tiptap": "tiptap",
        'tiptap-commands': 'tiptap-commands',
        'tiptap-utils': 'tiptap-utils',
        "tiptap-extensions": "tiptap-extensions",
        'prosemirror-commands': 'prosemirror-commands',

        //Brace Stuff
        'brace/ext/language_tools': 'brace/ext/language_tools',
        'brace/mode/html': 'brace/mode/html',
        'brace/mode/json': 'brace/mode/json',
        'brace/mode/javascript': 'brace/mode/javascript',
        'brace/mode/ejs': 'brace/mode/ejs',
        'brace/mode/scss': 'brace/mode/scss',
        'brace/theme/tomorrow_night_eighties': 'brace/theme/tomorrow_night_eighties',
        'brace/snippets/javascript': 'brace/snippets/javascript',
    },


    module: {
        // css: {
        //     loaderOptions: {
        //         sass: {
        //             prependData: "@import '~/src/variables.scss';",
        //         },
        //     },
        // },

        rules: [

            {
                test: /\.(s*)css$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: './styles/_variables.scss',
                        },
                    },
                ],
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            // this will apply to both plain `.js` files
            // AND `<script>` blocks in `.vue` files

            /**/
            {
                test: /\.js$/,
                //exclude: /node_modules/,
                loader: 'babel-loader',
                //options: {
                    // presets: ['latest'],
                  //  presets: ['@babel/preset-env'],
                  //  plugins: ['@babel/plugin-transform-runtime']
                //}
            }
            /**/


        ]
    },

    /**
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            // this will apply to both plain `.js` files
            // AND `<script>` blocks in `.vue` files
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                loader: 'sass-loader'
            },
            // this will apply to both plain `.css` files
            // AND `<style>` blocks in `.vue` files
            {
                test: /\.css$/,
                use: [
                    'sass-loader',
                    'vue-style-loader',
                    'css-loader',
                ]
            }
        ]
    },
    /**/
    plugins: [
        new VueLoaderPlugin(),
        // new VuetifyLoaderPlugin(),
    ],

    // resolve: {
    //     extensions: ['.js'],
    //     alias: {
    //         lodash: path.resolve('./node_modules/lodash/index.js'),
    //     }
    // },

    // plugins: [
    //       new JsDocPlugin(
    //       // {
    //       //     conf:path.join(__dirname, 'jsdoc.json'),
    //       // }
    //       )
    //   ],
    //   
    /**/
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    /**/
    // output: {
    //   filename: 'main.js',
    //   path: path.resolve(__dirname, 'dist')
    // }
};