/*
 * COPYRIGHT (C) 2019 Molex - All Rights Reserved 
 */
var path = require("path"),
    mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt');


var userSchema = new Schema({
    _id: {
        type: "String",
        required: true,
        unique: true
    },
    username: {
        type: "String",
        required: true,
        unique: true
    },
    password: {
        type: "String",
        required: true
    }
}, {
    toObject: {
        transform: function(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    },
    toJSON: {
        transform: function(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});

userSchema.methods.verifyPassword = function(userPassword, done) {
    bcrypt.compare(userPassword, this.password, function(err, isMatch) {
        if (err) return done(err);
        done(null, isMatch);
    });
}

userSchema.pre('findOneAndUpdate', function(done) {
    var user = this; // used to retain the scope of this
    bcrypt.genSalt(function(err, salt) {
        if (err) return done(err);
        bcrypt.hash(user._update.password, salt, function(err, hash) {
            if (err) return done(err);
            user._update.password = hash;
            done();
        });
    });
});

module.exports = userSchema;