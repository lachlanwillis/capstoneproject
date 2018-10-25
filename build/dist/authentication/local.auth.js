"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var passport_local_1 = require("passport-local");
var user_model_1 = require("../models/user.model");
exports.LocalAuth = new passport_local_1.Strategy({ usernameField: 'email' }, function (email, password, done) {
    user_model_1.User.findOne({ email: email })
        .then(function (user) {
        if (!user)
            return done(null, false);
        else {
            user.verifyPassword(password, function (err, isMatch) {
                if (err)
                    return done(err);
                else if (!isMatch)
                    return done(null, false);
                else {
                    user.last_login = new Date();
                    user.save();
                    return done(null, __assign({}, user, { id: user._id }));
                }
            });
        }
    }).catch(function (err) {
        console.error(err);
    });
});
