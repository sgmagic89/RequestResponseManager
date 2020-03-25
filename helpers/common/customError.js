/*
* COPYRIGHT (C) 2019 Molex - All Rights Reserved 
*/
// Custom Error Class contains all error objects that can be retrieved while communicating with req/res
var path = require("path"),
	logger = require('../../Logger/logger');
var customError = function (errorType) {
	this.errorType = errorType;
}

// List of all predefined error objects
customError.prototype.customErrorObj = {
	bad_request: { statusCode: 400, msg: "Bad Request" },
	unauthorized: { statusCode: 401, msg: "Unauthorized" },
	payment_required: { statusCode: 402, msg: "Payment Required" },
	forbidden: { statusCode: 403, msg: "Forbidden" },
	not_found: { statusCode: 404, msg: "Not Found" },
	method_not_allowed: { statusCode: 405, msg: "Method Not Allowed" },
	not_acceptable: { statusCode: 406, msg: "Not Acceptable" },
	proxy_authentication_required: { statusCode: 407, msg: "Proxy Authentication Required" },
	request_timeout: { statusCode: 408, msg: "Request Timeout" },
	conflict: { statusCode: 409, msg: "Conflict" },
	gone: { statusCode: 410, msg: "Gone" },
	length_required: { statusCode: 411, msg: "Length Required" },
	precondition_failed: { statusCode: 412, msg: "Precondition Failed" },
	payload_too_large: { statusCode: 413, msg: "Payload Too Large" },
	uri_too_long: { statusCode: 414, msg: "URI Too Long" },
	unsupported_media_type: { statusCode: 415, msg: "Unsupported Media Type" },
	range_not_satisfiable: { statusCode: 416, msg: "Range Not Satisfiable" },
	expectation_failed: { statusCode: 417, msg: "Expectation Failed" },
	misdirected_request: { statusCode: 421, msg: "Misdirected Request" },
	unprocessable_entity: { statusCode: 422, msg: "Unprocessable Entity" },
	locked: { statusCode: 423, msg: "Locked" },
	failed_dependency: { statusCode: 424, msg: "Failed Dependency" },
	unassigned: { statusCode: 425, msg: "Unassigned" },
	upgrade_required: { statusCode: 426, msg: "Upgrade Required" },
	precondition_required: { statusCode: 428, msg: "Precondition Required" },
	too_many_requests: { statusCode: 429, msg: "Too Many Requests" },
	request_header_fields_too_large: { statusCode: 431, msg: "Request Header Fields Too Large" },
	unavailable_for_legal_reasons: { statusCode: 451, msg: "Unavailable For Legal Reasons" },
	bad_gateway: { statusCode: 502, msg: "Bad Gateway" },
	internal_server_error: { statusCode: 500, msg: "Internal Server Error" }
}

customError.prototype.transcendServerErrorObj = [
	{ errorKey: ":( undefined", errorMsg: "Invalid Response", errorType: "unprocessable_entity" },
	{ errorKey: ":( not supported", errorMsg: "Invalid HTTP Request to Transcend Server ", errorType: "bad_request" },
	{ errorKey: ":( invalid JSON", errorMsg: "Invalid JSON", errorType: "unprocessable_entity" },
	{ errorKey: ":|", errorMsg: "Invalid JSON", errorType: "unprocessable_entity" },
	{ errorKey: ":(", errorMsg: "Invalid JSON", errorType: "unprocessable_entity" },
]

customError.prototype.isTranscendServerError = function (response) {
	var Component = "isTranscendServerError";
	var MessageType = "parsing";

	try {
		if (!response) {
			return true;
		}		
			var tsErrorObjCount = this.transcendServerErrorObj.length;
			for (var idx = 0; idx < tsErrorObjCount; idx++) {
				// indexOf is used as T.S returns url path along with not supported error. we have defined only not supported in transcendServerErrorObj
				if (Array.isArray(response) && response.indexOf(this.transcendServerErrorObj[idx].errorKey) != -1) {
					return { "statusCode": this.customErrorObj[this.transcendServerErrorObj[idx].errorType].statusCode, "msg": this.transcendServerErrorObj[idx].errorMsg };
				}
			}
			return false;		
	} catch (err) {
		logger.error("isTranscendServerError: " + err, Component, MessageType);
		return true;
	}
}

customError.prototype.molexAPIErrorObject = {
	ts_file_invalid: { errorMsg: "Invalid Transcend Server Config File Data", statusCode: 500 },
	ts_file_empty: { errorMsg: "Empty Transcend Server File", statusCode: 500 },
	ts_file_not_present: { errorMsg: "Transcend Server Config File not present", statusCode: 500 },
	ts_ip_not_present: { errorMsg: "IP Address is not present in Transcend Server Config File", statusCode: 500 },
	ts_config_empty: { errorMsg: "Transcend Server Config Data not present", statusCode: 500 },
	ts_not_responding: { errorMsg: "Transcend Server not responding", statusCode: 500 },
	ts_config_add_error: { errorMsg: "Error Adding Transcend Server Config Data", statusCode: 500 },
	ts_config_file_write_fail: { errorMsg: "Failed to write in Transcend Server Config File", statusCode: 500 },
	no_ts_configured: { errorMsg: "No Transcend Server Configured", statusCode: 500 },
	failed_db_query: { errorMsg: "Unable to Find Collection in Database ", statusCode: 500 },
	failed_db_insert: { errorMsg: "Unable to Insert value in Database ", statusCode: 500 },
	db_not_connected: { errorMsg: "Unable to connect to database", statusCode: 500 },
	ts_not_available: { errorMsg: "Unable to connect to Transcend Server", statusCode: 500 },
	data_parsing_failed: { errorMsg: "Unable to Parse Data", statusCode: 500 },
	project_data_insert_failed: { errorMsg: "Unable to Save Project Data in Database", statusCode: 500 },
	controller_data_insert_failed: { errorMsg: "Unable to Save Controller Data in Database", statusCode: 500 },
	space_data_insert_failed: { errorMsg: "Unable to Save Space Data in Database", statusCode: 500 },
	light_scenes_insert_failed: { errorMsg: "Unable to Save Light Scenes in Database", statusCode: 500 },
	palette_insert_failed: { errorMsg: "Unable to Save Palette in Database", statusCode: 500 },
	user_insert_failed: { errorMsg: "Unable to Save User Data in Database", statusCode: 500 },
	unable_parse_json: { errorMsg: "Unable to Parse JSON Object", statusCode: 500 },
	no_project: { errorMsg: "Unable to Find Project", statusCode: 500 },
	no_user: { errorMsg: "Unable to Find User", statusCode: 500 },
	invalid_password: { errorMsg: "Invalid Password", statusCode: 500 },
	building_data_insert_failed: { errorMsg: "Unable to Save Building Data in Database", statusCode: 500 },
	set_building_brightness_failed: { errorMsg: "Failed to update Building Brightness", statusCode: 500 },
	area_data_insert_failed: { errorMsg: "Area data insertion failed", statusCode: 500 },
	floor_data_insert_failed: { errorMsg: "Floor data insertion failed", statusCode: 500 },
	fixture_data_insert_failed: { errorMsg: "Fixture data insertion failed", statusCode: 500 },
	sensor_data_insert_failed: { errorMsg: "Sensor data insertion failed", statusCode: 500 },
	sensor_data_not_found: { errorMsg: "Sensor data not found", statusCode: 500 },
}


customError.prototype.getMolexAPIErrorObj = function (key) {
	return { "statusCode": this.molexAPIErrorObject[key].statusCode, "msg": this.molexAPIErrorObject[key].errorMsg };
}

/**
 * getErrorObj() retrieves the desired error object based on errorType
 *
 * @param <String> key - getProjects / getProjectByName / setProjectByName
 * @param <String> OPTIONAL - option - specific parameters to be sent
 * @param <String> OPTIONAL - method - API action i.e. GET or PUT
 * @return <Object> JSON object with method / host / port / path
 */
customError.prototype.getErrorObj = function (msg = "") {
	return { "statusCode": this.customErrorObj[this.errorType].statusCode, "msg": (msg) ? (msg) : (this.customErrorObj[this.errorType].msg) };
};

module.exports = customError;