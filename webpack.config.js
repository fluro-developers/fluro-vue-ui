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
        'fluro':'fluro',
        'fluro-vue':'fluro-vue',
        'vuex-map-fields':'vuex-map-fields',
    },
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