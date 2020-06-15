import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import minify from 'rollup-plugin-babel-minify';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import serve from 'rollup-plugin-serve';
import vue from 'rollup-plugin-vue';
import globalStyles from 'rollup-plugin-vue-global-styles'
import alias from '@rollup/plugin-alias';
import pkg from './package.json';








const patterns = ['./src/variables.scss']


const LIBRARY_NAME = 'FluroVueUI';
const FILE_NAME = 'fluro-vue-ui';

const sourcemap = true;







const plugins = [
				alias({
								entries: [
												{ find: 'src', replacement: __dirname + '/src' },
												{ find: 'vue-youtube', replacement: __dirname + '/node_modules/vue-youtube/dist/vue-youtube.esm.js' },
												//{ find: 'vue', replacement: require.resolve('vue/dist/vue.esm.js') },
								]
				}),
				globalStyles({ patterns }),
				//css(),

				vue({
					//css:false, //TOGGLE THIS ON BEFORE BUILD - FOR WEB BUILDER CSS
								postcss: {
												plugins: require('./postcss.config')().plugins
								}
				}),

				resolve({
								browser: true
				}),
				commonjs(),
				babel({
								exclude: 'node_modules/**'
				}),


				postcss({
								//extract: true, //TOGGLE THIS ON BEFORE BUILD - FOR WEB BUILDER CSS
				})
];
const pluginsWithMinify = plugins.slice(0);

const defaultConfig = {
				input: 'src/index.js',
				//inlineDynamicImports: true,
};


// const globals = Object.keys(pkg.peerDependencies);
const globals = {
				'lodash': 'lodash',
				'fluro': 'fluro',
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
				'brace/theme/chrome': 'brace/theme/chrome',
				'brace/ext/searchbox': 'brace/ext/searchbox',
				'brace/ext/language_tools': 'brace/ext/language_tools',
				'brace/mode/html': 'brace/mode/html',
				'brace/mode/json': 'brace/mode/json',
				'brace/mode/javascript': 'brace/mode/javascript',
				'brace/mode/ejs': 'brace/mode/ejs',
				'brace/mode/scss': 'brace/mode/scss',
				'brace/theme/tomorrow_night_eighties': 'brace/theme/tomorrow_night_eighties',
				'brace/snippets/javascript': 'brace/snippets/javascript',
}

if (process.env.NODE_ENV === 'production') {
				pluginsWithMinify.push(minify());
}

if (process.env.NODE_ENV === 'development') {
				defaultConfig.input = 'dev/main.js';
				defaultConfig.watch = {
								include: ['src/**', 'dev/**']
				};

				plugins.push(livereload());
				plugins.push(serve({
								contentBase: '.',
								open: true
				}));
}

export default [
				Object.assign({}, defaultConfig, {
								output: [
												/**
													{
																				// exports: 'named',
																				globals,
																				dir: 'dist/cjs',
																				// file: `dist/${FILE_NAME}.common.js`,
																				format: 'cjs',
																				sourcemap
																},
																/**/
												{
																// exports: 'named',
																globals,
																dir: 'dist/es',
																// file: `dist/${FILE_NAME}.es.js`,
																format: 'es',
																sourcemap
												}
								],
								plugins
				}),
				// Object.assign({}, defaultConfig, {
				// 				output: {
				// 								globals,
				// 								dir:'dist/iife',
				// 								// file: `dist/${FILE_NAME}.js`,
				// 								format: 'iife',
				// 								name: LIBRARY_NAME,
				// 								sourcemap
				// 				},
				// 				plugins
				// }),
				// Object.assign({}, defaultConfig, {
				// 				output: {
				// 								globals,
				// 								dir:'dist/iife',
				// 								// file: `dist/${FILE_NAME}.min.js`,
				// 								format: 'iife',
				// 								name: LIBRARY_NAME,
				// 								sourcemap
				// 				},
				// 				plugins: pluginsWithMinify
				// })
];
