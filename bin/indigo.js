var http = require('http');
var serverParams;

exports.connectServer = function(params) {
	serverParams = {};
	serverParams.host = params.host;
	serverParams.port = params.port;
	serverParams.serverPath = params.serverPath;
	serverParams.variablesPath = params.variablesPath;
};


exports.setVariable = function(name, value, successCallback, errorCallback) {
	console.log('Setting Indigo variable: ' + name + ' to: ' + value);
	if (serverParams) {
		http.get({
			host: serverParams.host,
			port: serverParams.port,
			path: serverParams.serverPath + serverParams.variablesPath + name + '?_method=put&value=' + value
		}, function(res) {
			if (successCallback) {
				successCallback(res);
			} else {
				console.log("Got response: " + res.statusCode);
			}
		}).on('error', function(e) {
			if (errorCallback) {
				errorCallback(e);
			} else {
				console.log("Got error: " + e.message);
			}
		});
	} else {
		console.log('ERROR: Invalid Server Params');
	}
};