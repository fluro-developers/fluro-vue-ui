var fs = require('fs')
var path = require('path')
var _ = require('lodash');

const { readFile, writeFile } = require('fs').promises



String.prototype.replaceAll = function(search, replace) {
				return this.replace(new RegExp(search, 'g'), replace)
}



function loadFiles(next) {

				return walk('./src', next);

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
function repairFile(filepath, filedata) {

				return new Promise(function(resolve, reject) {

								// var matches = filedata.exec(/);

								// var reg = /\'src\/(.*?)\'/g
								var reg = /\"src\/(.*?)\"/g
								var result;

								var matches = []
								while ((result = reg.exec(filedata)) !== null) {
												matches.push(`src/` + result[1]);
								}



								if (!matches || !matches.length) {
												return resolve();
								}


								var sourcePath = filepath.split('/Users/cadeembery/Code/fluro-vue-ui/').join('');

								var sourcePieces = sourcePath.split('/');
								// var sourcePath = _.replace(filepath, '/Users/cadeembery/Code/fluro-vue-ui')

								var oneless = sourcePieces.slice(0, sourcePieces.length - 1).join('/');


								var mapped = matches.map(function(original) {

												var relative = path.relative(oneless, original)



												if (!relative || !relative.length) {
																relative = original;
												}

												if (relative[0] != '.') {
																relative = `./${relative}`;
												}

												return { original, relative }
								});







								console.log('***************'); //, matches[1])
								console.log('Entry', sourcePath, sourcePieces); //, matches[1])

								var cleaned = filedata;
								mapped.forEach(function(entry) {

												cleaned = cleaned.replaceAll(entry.original, entry.relative);
												console.log('CLEANED', entry.original, entry.relative)



								});


								return fs.writeFile(filepath, cleaned, function(err, result) {
												if (err) {
																console.log('ERrrror', err);
																return reject(err);
												}

												console.log('Cleaned File', sourcePath)
												resolve(result);

								})
								// console.log(mapped);

								// promises.resolve(resolve);

				})
}


///////////////////////////////////////////////////////////////

loadFiles(function(err, results) {

				var promises = _.filter(results, function(file) {
								if (_.endsWith(file, '.vue') || _.endsWith(file, '.js')) {

												return new Promise(function(resolve, reject) {

																return readFile(file, { encoding: 'utf8' }).then(function(fileData) {

																				repairFile(file, fileData).then(resolve);
																				// console.log('FILE DATA', fileData)
																				// return resolve(fileData)
																}, reject);
												})
								} else {
												return Promise.resolve(null);
								}
				})


				Promise.all(promises)
								.then(function(files) {
												console.log('FILES', files)
								})
								.catch(function(err) {
												console.log(err);
								})

})
