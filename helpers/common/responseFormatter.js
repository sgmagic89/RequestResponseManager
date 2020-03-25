/*
* COPYRIGHT (C) 2019 Molex - All Rights Reserved 
*/
// Declare responseFormattter class with an empty constructor
var responseFormattter = function () {

};

// List of all predefined error objects
responseFormattter.prototype.responseErrorObj = {
    bad_request: { statusCode: 400, msg: "Bad Request" },
    unauthorized: { statusCode: 401, msg: "Unauthorized" },
    payment_required: { statusCode: 402, msg: "Payment Required" },
    forbidden: { statusCode: 403, msg: "Forbidden" },
    not_found: { statusCode: 404, msg: "Resource not found" },
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
    internal_server_error: { statusCode: 500, msg: "Internal Server Error" },
    parameter_validation_failed: { statusCode: 422, msg: "Invalid parameters" },
    failed_db_query: { statusCode: 502, msg: "Invalid parameters" },
    success_request: { statusCode: 200, msg: "Success" },
    no_data_found: { statusCode: 200, msg: "No data found" },
}


responseFormattter.prototype.molexAPIErrorObject = {
    invalid_params: { errorMsg: "Invalid parameters", statusCode: 1000 },
    ts_file_invalid: { errorMsg: "Invalid Transcend Server Config File Data", statusCode: 1000 },
    ts_file_empty: { errorMsg: "Empty Transcend Server File", statusCode: 1001 },
    ts_file_not_present: { errorMsg: "Transcend Server Config File not present", statusCode: 1002 },
    ts_ip_not_present: { errorMsg: "IP Address is not present in Transcend Server Config File", statusCode: 1003 },
    ts_config_empty: { errorMsg: "Transcend Server Config Data not present", statusCode: 1004 },
    ts_not_responding: { errorMsg: "Transcend Server not responding", statusCode: 1005 },
    ts_unknown_error: { errorMsg: "Transcend Server not responding", statusCode: 1005 },
    ts_config_add_error: { errorMsg: "Error Adding Transcend Server Config Data", statusCode: 1006 },
    ts_config_file_write_fail: { errorMsg: "Failed to write in Transcend Server Config File", statusCode: 1007 },
    no_ts_configured: { errorMsg: "No Transcend Server Configured", statusCode: 1008 },
    failed_db_insert: { errorMsg: "Unable to Insert value in Database ", statusCode: 1009 },
    db_not_connected: { errorMsg: "Unable to connect to database", statusCode: 1010 },
    ts_not_available: { errorMsg: "Unable to connect to Transcend Server", statusCode: 1011 },
    data_parsing_failed: { errorMsg: "Unable to Parse Data", statusCode: 1012 },
    project_data_insert_failed: { errorMsg: "Unable to Save Project Data in Database", statusCode: 1013 },
    controller_data_insert_failed: { errorMsg: "Unable to Save Controller Data in Database", statusCode: 1014 },
    space_data_insert_failed: { errorMsg: "Unable to Save Space Data in Database", statusCode: 1015 },
    light_scenes_insert_failed: { errorMsg: "Unable to Save Light Scenes in Database", statusCode: 1016 },
    palette_insert_failed: { errorMsg: "Unable to Save Palette in Database", statusCode: 1017 },
    unable_parse_json: { errorMsg: "Unable to Parse JSON Object", statusCode: 1017 },
    ts_failed_response: { errorMsg: "Unable to get response from transcend server", statusCode: 1019 },
    failed_db_query: { errorMsg: "Unable to execute query in database", statusCode: 1020 },
    unknown_error: { errorMsg: "Unknown error occured", statusCode: 1021 },
    bad_request: { errorMsg: "Unable to connect to Transcend Server", statusCode: 1022 },
    ts_success_response: { successMsg: "API request is successfull", statusCode: 1023 },
    fixture_not_found: { errorMsg: "Unable to find Fixture", statusCode: 1024 }, // --
    sensor_not_found: { errorMsg: "Unable to find Sensor", statusCode: 1025 }, // --
    project_not_found: { errorMsg: "Unable to find Project", statusCode: 1026 }, // --
    controller_not_found: { errorMsg: "Unable to find Controller", statusCode: 1027 }, // --
    lightscene_not_found: { errorMsg: "Unable to find light scene", statusCode: 1028 }, // --
    zoneconfig_not_found: { errorMsg: "Unable to find zone config", statusCode: 1029 }, // --
    building_not_found: { errorMsg: "Unable to find building", statusCode: 1030 }, // --
    areadata_not_found: { errorMsg: "Unable to find Area", statusCode: 1031 }, // --
    floordata_not_found: { errorMsg: "Unable to find Floor", statusCode: 1032 }, // --
    mappeduids_not_found: { errorMsg: "Unable to find Area", statusCode: 1033 }, // --
    unsupported: { errorMsg: "Unsupported Operation", statusCode: 1034 }, // --
    unprocessable_entity: { errorMsg: "Transcend Server is unable to process request", statusCode: 1035 }, // --
    zonedata_not_found: { errorMsg: "Unable to find Zone Data", statusCode: 1036 }, // --
    building_data_insert_failed: { errorMsg: "Unable to Save Building Data in Database", statusCode: 1037 },
    lights_not_found: { errorMsg: "Unable to find Lights", statusCode: 1038 }, // --
    no_project: { errorMsg: "Invalid project id", statusCode: 1040 },
    invalid_json: { errorMsg: "Invalid JSON data", statusCode: 1041 },
    sensordata_not_found: { errorMsg: "Unable to find sensor data", statusCode: 1041 },
    script_failed: { errorMsg: "Unable to execute script", statusCode: 1042 },
    zone_deleted: { errorMsg: "Zone no more exists", statusCode: 1043 },
    floor_deleted: { errorMsg: "Floor no more exists", statusCode: 1044 },
    subscription_already_done: { errorMsg: "Subscription already done", statusCode: 1045 },
    subscription_not_found: { errorMsg: "Subscription id not found", statusCode: 1046 },
    not_beacon_zone: { errorMsg: "Zone is not a beacon zone", statusCode: 1047 },
    no_user: { errorMsg: "User does not exist", statusCode: 1048 },
    invalid_password: { errorMsg: "Password is invalid", statusCode: 1049 },
    area_data_insert_failed: { errorMsg: "Area data insertion failed", statusCode: 1050 },
    floor_data_insert_failed: { errorMsg: "Floor data insertion failed", statusCode: 1051 },
    fixture_data_insert_failed: { errorMsg: "Fixture data insertion failed", statusCode: 1052 },
    sensor_data_insert_failed: { errorMsg: "Sensor data insertion failed", statusCode: 1053 },
    user_insert_failed: { errorMsg: "User data insertion failed", statusCode: 1054 },
    sensor_data_not_found: { errorMsg: "Sensor data not found", statusCode: 1055 },
    beacon_not_found: { errorMsg: "Unable to find Beacon", statusCode: 1056 }, // --
    blind_not_found: { errorMsg: "Unable to find Blind", statusCode: 1057 }, // --
    data_not_found: { errorMsg: "Data not found", statusCode: 1058 },
    data_not_applicable: { errorMsg: "Data not applicable", statusCode: 1059 },
    not_blind_zone: { errorMsg: "Zone is not a blind zone", statusCode: 1060 },
    mqttdata_not_found: { errorMsg: "Unable to find MQTT Client Subscription Topic List data", statusCode: 1061 }, // --
    invalid_range: { errorMsg: "Range is invalid", statusCode: 1062 },
    invalid_zone_type: { errorMsg: "Zone type is invalid", statusCode: 1063 },    
    invalid_scene: { errorMsg: "Scene is invalid", statusCode: 1064 },
    invalid_mood: { errorMsg: "Mood is invalid", statusCode: 1065 },
    invalid_data_for_heatIndex: { errorMsg: "Unable to calculate heat index", statusCode: 1066 }
}

responseFormattter.prototype.transcendServerErrorObj = [
    { errorKey: ":( undefined", errorMsg: "Invalid Response", type: "unprocessable_entity", status: false },
    { errorKey: ":( not supported", errorMsg: "Invalid HTTP Request to Transcend Server ", type: "bad_request", status: false },
    { errorKey: ":( invalid JSON", errorMsg: "Invalid JSON", type: "unprocessable_entity", status: false },
    { errorKey: ":|", type: "ts_success_response", status: true },
    { errorKey: ":(", type: "ts_failed_response", status: false },
    { errorKey: ":)", type: "ts_success_response", status: true },
]

responseFormattter.prototype.isTranscendServerError = function (response, propertyModel, customMessage = "") {
    try {
        var tsErrorObjCount = this.transcendServerErrorObj.length;

        for (var idx = 0; idx < tsErrorObjCount; idx++) {
            // indexOf is used as T.S returns url path along with not supported error. we have defined only not supported in transcendServerErrorObj
            if (response.indexOf(this.transcendServerErrorObj[idx].errorKey) != -1) {
                var resObj = {}
                resObj = this.molexAPIErrorObject[this.transcendServerErrorObj[idx].type];
                resObj.propertyInfo = propertyModel;
                resObj.type = this.transcendServerErrorObj[idx].type;
                return { status: this.transcendServerErrorObj[idx].status, data: resObj };
            }
        }
        return this.molexAPIErrorObject["ts_unknown_error"];
    } catch (err) {
        return this.molexAPIErrorObject["ts_unknown_error"];
    }

}

/**
 * getFormattedResponseObject() generates the options parameter for http request
 *
 * @param <String> status - response success status
 * @param <String>  - successResponse - success data in response
 * @param <String> - errorResponse - error data in response
 * @param <String> - httpStatusKey - http status key
 * @return <Object> JSON object with method / host / port / path
 */
responseFormattter.prototype.getFormattedResponseObject = function (status, successResponse, errorResponse, message, httpStatusKey = 'success_request') {
    var httpResponseObj = this.responseErrorObj[httpStatusKey];
    var err = [];
    var successData = [];
    if (errorResponse) {
        err = (errorResponse.constructor === Array) ? (errorResponse) : ([errorResponse]);
    }
    if (successResponse) {
        successData = (successResponse.constructor === Array) ? (successResponse) : ([successResponse]);
    }
    return { status: status, result: { data: successData, error: err }, code: httpResponseObj.statusCode, message: message }
}

/**
 * getErrorResponseObject() generates the options parameter for http request
 *
 * @param <String> status - response success status
 * @param <String>  - successResponse - success data in response
 * @param <String> - errorResponse - error data in response
 * @param <String> - httpStatusKey - http status key
 * @return <Object> JSON object with method / host / port / path
 */
responseFormattter.prototype.getTsErrorResponseObject = function (appErrorKey, propertyDetails) {
    return this.isTranscendServerError(appErrorKey, propertyDetails);
}

responseFormattter.prototype.getErrorResponseObject = function (appErrorKey, propertyDetails) {    
    var errorObj = {}
    errorObj = this.molexAPIErrorObject[appErrorKey];
    errorObj.propertyInfo = propertyDetails;
    errorObj.type = appErrorKey;
    errorObj.status = false;    
    return errorObj;
}

// Make the controller class public by exporting it
module.exports = responseFormattter;
