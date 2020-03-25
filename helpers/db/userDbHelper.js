/*
* COPYRIGHT (C) 2019 Molex - All Rights Reserved 
*/
// save the data to the projects collection
// retrieves the data from the projects collection

var path = require("path"),
    mongoose = require("mongoose"),
    userSchema = require('../../schemas/dbSchema/userSchema');

/**
 * userDbHelper() - Constructor - initiates the schema with projectSchema and creates a model property based on that
 *
 * @return <Void> void
 */
var userDbHelper = function() {
	this.schema = userSchema;
	this.model = mongoose.model("users", this.schema);
}

/**
 * saveUserData() - saves the json object provided as parameter into the model
 *
 * @param <String> projectObj - type of JSON object to be retrieved
 * @param <Function> callback - callback function invoked when data is saved
 * @return <Void> void
 */
userDbHelper.prototype.saveUserData = function(userData, callback) {
	this.model.findOneAndUpdate({_id: userData._id}, userData, {upsert: true}, function(err) {
		if(err) {
			callback(err);
		} else {
			callback();
		}
	});
}

/**
 * getUserData() - gets the user data stored in database
 *
 * @param <Function> callback - callback function invoked when data is saved
 * @return <Void> void
 */
userDbHelper.prototype.getUserData = function(callback) {
	this.model.find({}, callback);
}

userDbHelper.prototype.findUserData = function(filterQuery, callback) {
	this.model.findOne(filterQuery, function(err, response) {
		callback(err, response);
	});
}

userDbHelper.prototype.removeAllUserData = function(callback) {
	this.model.remove({}, callback);
}

module.exports = userDbHelper;