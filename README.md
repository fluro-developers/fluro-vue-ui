# Rollup + Vue Example

<br>
<p align="center">
	<img src="https://img.shields.io/badge/Made%20with-%F0%9F%96%96%20Vue%20%26%20Rollup-4fc08d.svg?style=for-the-badge" alt="Made with Vue + Rollup">
</p>
<br>

An example of bundling [Vue](https://vuejs.org/) library with [Rollup](http://rollupjs.org/).

## Installation

```bash
git clone https://github.com/gluons/rollup-vue-example.git
cd rollup-vue-example
yarn
```

## Features

## Build

```bash
yarn build
```

- Bundle `.vue` file (by [`rollup-plugin-vue`](https://github.com/vuejs/rollup-plugin-vue))
- 3 JavaScript bundles (with source map):
  - CommonJS
  - ES Module
  - Browser [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE)
    - Minified (by [`rollup-plugin-babel-minify`](https://github.com/Comandeer/rollup-plugin-babel-minify))
    - Unminified
- Final CSS file:
  - [PostCSS](http://postcss.org/) support (by [`rollup-plugin-postcss`](https://github.com/egoist/rollup-plugin-postcss))
  - [Autoprefixer](https://github.com/postcss/autoprefixer)
  - Minified (by [`postcss-csso`](https://github.com/lahmatiy/postcss-csso))

## Dev

```bash
yarn dev
```

- Development Server with live reload by [`rollup-plugin-serve`](https://github.com/thgh/rollup-plugin-serve) and [`rollup-plugin-livereload`](https://github.com/thgh/rollup-plugin-livereload).
