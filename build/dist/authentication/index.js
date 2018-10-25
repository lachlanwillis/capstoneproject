"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var passport = require("passport");
var local_auth_1 = require("./local.auth");
var facebook_auth_1 = require("./facebook.auth");
var google_auth_1 = require("./google.auth");
var user_model_1 = require("../models/user.model");
exports.authentication = passport;
exports.authentication.use(local_auth_1.LocalAuth);
exports.authentication.use(facebook_auth_1.FacebookAuth);
exports.authentication.use(google_auth_1.GoogleAuth);
exports.authentication.serializeUser(function (user, callback) {
    return callback(null, user.id);
});
exports.authentication.deserializeUser(function (id, callback) {
    user_model_1.User.findOne({ _id: id })
        .then(function (user) { return callback(null, user); })
        .catch(function (err) { return callback(err); });
});
