"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var passport_google_oauth20_1 = require("passport-google-oauth20");
var models_1 = require("../models");
exports.GoogleAuth = new passport_google_oauth20_1.Strategy({
    clientID: '255201340078-cedvii5bjtgmde1ofh8u6pfvfmms0k6m.apps.googleusercontent.com',
    clientSecret: 'gzIWvq_pNG2fim8K-2qvXNz0',
    callbackURL: 'http://localhost:4200/api/auth/google/callback'
}, function (accessToken, refreshToken, profile, callback) {
    models_1.User.findOne({ 'google.id': profile.id })
        .then(function (user) {
        if (!user) {
            var user_1 = new models_1.User();
            user_1.google = {
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
