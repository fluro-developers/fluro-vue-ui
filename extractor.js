var fs = require('fs')
var path = require('path')
var _ = require('lodash');

const { readFile, writeFile } = require('fs').promises




function loadFiles(next) {

				return walk('./extracted', next);

				/////////////////////

				function walk(dir, done) {
								var results = [];
								fs.readdir(dir, function(err, list) {
												if (err) return done(err);
												var pending = list.length;
												if (!pending) return done(null, results);
												list.forEach(function(file) {
																file = path.resolve(dir, file);
																fs.stat(file, function(err, stat) {
																				if (stat && stat.isDirectory()) {
																								walk(file, function(err, res) {
																												results = results.concat(res);
																												if (!--pending) done(null, results);
																								});
																				} else {
																								results.push(file);
																								if (!--pending) done(null, results);
																				}
																});
												});
								});
				}

}




///////////////////////////////////////////////////////////////

loadFiles(function(err, results) {


				var string = '';

				Promise.all(results.map(function(file) {
												return readFile(file, { encoding: 'utf8' }).then(function(fileData) {
																string += fileData;
												});
								}))
								.then(function() {

												return fs.writeFile('./flurovueui.css', string, function(err, result) {
																if (err) {
																				console.log('ERrrror', err);
																}

																console.log('Extracted File')

												})


								})
})
