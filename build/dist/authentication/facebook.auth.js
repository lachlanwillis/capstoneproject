"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var passport_facebook_1 = require("passport-facebook");
var models_1 = require("../models");
exports.FacebookAuth = new passport_facebook_1.Strategy({
    clientID: '653263221696248',
    clientSecret: '98ac9c74c4364870437422ac17646284',
    callbackURL: 'http://localhost:4200/api/auth/facebook/callback'
}, function (accessToken, refreshToken, profile, callback) {
    models_1.User.findOne({ 'facebook.id': profile.id })
        .then(function (user) {
        if (!user) {
            var user_1 = new models_1.User();
            user_1.facebook = {
                id: profile.id,
                token: accessToken,
                name: profile.displayName,
                email: (profile.emails) ? (profile.emails[0]) ? profile.emails[0].value : '' : ''
            };
            user_1.verified = true;
            return user_1.save()
                .then(function () { return user_1; });
        }
        else {
            return user;
        }
    })
        .then(function (user) { return callback(null, user); })
        .catch(function (err) {
    });
});
