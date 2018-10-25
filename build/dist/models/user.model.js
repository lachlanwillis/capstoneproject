"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var bcrypt = require("bcrypt");
exports.UserSchema = new mongoose_1.Schema({
    email: String,
    name: String,
    password: String,
    token: String,
    verified: { type: Boolean, default: false },
    admin: { type: Boolean, default: false },
    last_login: { type: Date, default: Date.now() },
    points: { type: Number, default: 0 },
    deleted: { type: Boolean, default: false },
    postcode: Number,
    google: {
        id: String,
        token: String,
        name: String,
        email: String
    },
    facebook: {
        id: String,
        token: String,
        name: String,
        email: String
    },
    leaderboardVisible: { type: Boolean, default: true }
});
exports.UserSchema.methods.verifyPassword = function (password, callback) {
    bcrypt.compare(password, this.password)
        .then(function (match) {
        console.log('match', match);
        callback(null, match);
    }).catch(function (err) { return callback(err, false); });
};
exports.User = mongoose_1.model("User", exports.UserSchema);
