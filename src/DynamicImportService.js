const service = {};
const lookup = {};


/////////////////////////////

service.load = function(path, generatePromise, fullModule) {

				return new Promise(function(resolve, reject) {

								//Check if we've already imported this component
								var alreadyImported = lookup[path];

								//If we haven't then run the promise generate function
								if (!alreadyImported) {
												// console.log('Create promise!', path);
												alreadyImported = lookup[path] = generatePromise();
								}

								//////////////////////////////
								alreadyImported
												.then(function(module) {

																if (fullModule) {
																				resolve(module);
																}
																// console.log('Resolve Default Module', path);
																return resolve(module.default);
												})
												.catch(reject);


				})
}

/////////////////////////////

export default service;
