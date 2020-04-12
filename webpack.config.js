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
    externals: {
        'vue':'vue',
        'lodash':'lodash',
        'brace':'brace',
        'fluro':'fluro',
        'vue-color':'vue-color',
        'vuetify':'vuetify',
        'signature_pad':'signature_pad',
        'js-beautify':'js-beautify',
        'vue2-ace-editor':'vue2-ace-editor',
        'vuedraggable':'vuedraggable',
        'fluro-vue':'fluro-vue',
        'vuex-map-fields':'vuex-map-fields',

        //Brace Stuff
        'brace/ext/language_tools':'brace/ext/language_tools',
        'brace/mode/html':'brace/mode/html',
        'brace/mode/json':'brace/mode/json',
        'brace/mode/javascript':'brace/mode/javascript',
        'brace/mode/ejs':'brace/mode/ejs',
        'brace/mode/scss':'brace/mode/scss',
        'brace/theme/tomorrow_night_eighties':'brace/theme/tomorrow_night_eighties',
        'brace/snippets/javascript':'brace/snippets/javascript',
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
    // plugins: [
    //       new JsDocPlugin(
    //       // {
    //       //     conf:path.join(__dirname, 'jsdoc.json'),
    //       // }
    //       )
    //   ],
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
    // output: {
    //   filename: 'main.js',
    //   path: path.resolve(__dirname, 'dist')
    // }
};