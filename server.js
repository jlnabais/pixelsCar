const request = require('request-promise-native');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://api.prod.smartservices.car2go.com';
const vehicleIDNumber = 'MOCKPIXEL011';

const certFile = path.resolve(__dirname, '../Smart_Code_Kit_MOCKPIXEL011/certificates/pixelcamp.pem')
const keyFile = path.resolve(__dirname, '../Smart_Code_Kit_MOCKPIXEL011/certificates/private.key')


const _baseRequest = (path, queryString, httpMethod) => {
	return request(
	{
		url: `${BASE_URL}${path}`,
		qs: queryString || {},
		method: httpMethod || 'GET',
		cert: fs.readFileSync(certFile),
	    key: fs.readFileSync(keyFile),
	    passphrase: 'smartcode',
	});
}

const check = () => {
	return _baseRequest(`/vega/service/check`);
}

const getVehicleInfo = (vin) => {
	return _baseRequest(`/vega/vehicles/${vin}`);
}

const getEvents = (vin) => {
	return _baseRequest(`/vega/events`, {
		vin: vehicleIDNumber
	});
}

getEvents(vehicleIDNumber).then((data) => {
	console.log(JSON.parse(data));
}).catch(error => console.log(error));