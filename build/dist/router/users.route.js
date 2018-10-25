"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var identifyProfanity = require("fuhk");
var user_model_1 = require("../models/user.model");
var utils_1 = require("../utils");
var email_1 = require("../utils/email");
var shortid_1 = require("shortid");
var bcrypt = require("bcrypt");
var request = require("request");
var GMAPS_API = 'AIzaSyCOgRBeLRUAUeFdd3tgHMSmOm0k_m9V8fk';
/**
 * The handler that manages user sign ups. Creates an entry in the database for a user and
 * and stores information like email and hashed password.
 */
exports.HandleUserSignup = function (req, res) {
    if (!verifySignupInformation({
        email: req.body.email,
        password: req.body.password
    }))
        res.status(400).json({ error: true, success: false, message: 'Information is invalid' });
    else if (stringContainsProfanity(req.body.email))
        res.json({ error: true, success: false, message: 'That email does not meet our guidelines' });
    else {
        verifyUniqueEmail(req.body.email)
            .then(function (unique) {
            if (unique) {
                bcrypt.hash(req.body.password, 10)
                    .then(function (hash) {
                    var token = shortid_1.generate();
                    (new user_model_1.User({
                        email: req.body.email.toLowerCase(),
                        name: req.body.email.split('@')[0],
                        password: hash,
                        token: token
                    })).save()
                        .then(function () {
                        res.json({ success: true });
                        email_1.sendVerificationEmail(req.body.email, token);
                    })
                        .catch(function (err) { return res.json({
                        error: true,
                        success: false,
                        message: 'An unexpected error occurred',
                        errorDump: err
                    }); });
                });
            }
            else
                res.status(400).json({ success: false, error: true, message: 'Email is taken' });
        });
    }
};
exports.HandleUserLogin = function (req, res) {
    if (!req.user) {
        res.json({ redirect: '/login' });
    }
    user_model_1.User.findById(req.user.id)
        .then(function (user) {
        if (user.verified) {
            res.json({ success: true });
        }
        else {
            req.logout();
            res.json({ redirect: '/verify' });
        }
    })
        .catch(function () {
        req.logout();
        res.json({ redirect: '/login' });
    });
};
/**
 * The hander for users loging out.
 */
exports.HandleUserLogout = function (req, res) {
    req.logout();
    res.json({ succes: true, error: false, message: 'You have been successfully logged out.' });
};
/**
 * The handler for checking whether a user is an admin or not
 */
exports.IsUserAdmin = function (req, res) {
    if (!(!req.isAuthenticated || !req.isAuthenticated()) && req.user.admin)
        res.json({ success: true });
    else
        res.json({ success: false });
};
/**
 * The handler for promoting a user to admin
 */
exports.PromoteUser = function (req, res) {
    if (!req.body.id)
        res.status(500).json({ success: false, error: true, message: 'No id' });
    else
        user_model_1.User.findById(req.body.id)
            .then(function (user) {
            user.admin = true;
            user.save()
                .then(function () { return res.json({ success: true }); })
                .catch(function (err) { return res.json({ success: false, error: true, message: err }); });
        })
            .catch(function (err) { return res.json({ success: false, error: true, message: err }); });
};
/**
 * Handler for demoting a user. Takes an id of a user from the body.
 */
exports.DemoteUser = function (req, res) {
    if (!req.body.id)
        res.status(500).json({ success: false, error: true, message: 'No id' });
    else
        user_model_1.User.findById(req.body.id)
            .then(function (user) {
            user.admin = false;
            user.save()
                .then(function () { return res.json({ success: true }); })
                .catch(function (err) { return res.status(500).json({ success: false, error: true, message: err }); });
        })
            .catch(function (err) { return res.status(500).json({ success: false, error: true, message: err }); });
};
/**
 * Handler for opting a user out of the leaderboard
 * @param req
 * @param res
 */
exports.OptOutLeaderboard = function (req, res) {
    if (!req.user.id)
        res.status(500).json({ success: false, error: true, message: 'No id' });
    else {
        user_model_1.User.findById(req.user.id)
            .then(function (user) {
            user.leaderboardVisible = false;
            user.save()
                .then(function () { return res.json({ success: true }); })
                .catch(function (err) { return res.json({ success: false, error: true, message: err }); });
        });
    }
};
/**
 * Handler for opting a user back into the leaderboard
 * @param req
 * @param res
 */
exports.OptInLeaderboard = function (req, res) {
    if (!req.user.id)
        res.status(500).json({ success: false, error: true, message: 'No id' });
    else {
        user_model_1.User.findById(req.user.id)
            .then(function (user) {
            user.leaderboardVisible = true;
            user.save()
                .then(function () { return res.json({ success: true }); })
                .catch(function (err) { return res.json({ success: false, error: true, message: err }); });
        });
    }
};
exports.DeleteUserHandler = function (req, res) {
    console.log(req.body);
    if (!req.body.id) {
        return res.status(500).json({ error: true, message: 'Invalid request' });
    }
    user_model_1.User.findByIdAndRemove(req.body.id)
        .then(function () { return res.json({ success: true }); })
        .catch(function (e) { return res.status(500).json({ error: true, message: e.message }); });
};
exports.GetUsersHandler = function (req, res) {
    user_model_1.User.find({}, null, { sort: '-last_login' })
        .then(function (users) { return res.json({ success: true, users: users }); })
        .catch(function (e) { return res.status(500).json({ error: true, message: e.message }); });
};
exports.SetPostcodeHandler = function (req, res) {
    if (!req.body.lat || !req.body.long || isNaN(Number(req.body.lat)) || isNaN(Number(req.body.long))) {
        return res.status(500).json({ message: 'Malformed request.' });
    }
    request
        .get({
        url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + req.body.lat + "," + req.body.long + "&location_type=ROOFTOP&result_type=street_address&key=" + GMAPS_API,
        json: true
    }, function (err, response, body) {
        if (err) {
            return res.status(500).json({ error: true, message: err });
        }
        var results = body.results;
        if (!results[0] || !results[0].address_components || results[0].address_components.length <= 0) {
            return res.status(500).json({ error: true, message: 'Malformed response.' });
        }
        var components = results[0].address_components;
        var postcode = components.reduce(function (acc, a) {
            if (a.types.includes('postal_code')) {
                return acc || a.short_name;
            }
        }, undefined);
        if (!postcode)
            return res.json({ success: false, message: 'No postcode found.' });
        user_model_1.User.findByIdAndUpdate(req.user.id, { $set: { postcode: postcode } })
            .then(function () { return res.json({ succes: true, postcode: postcode }); })
            .catch(function (err) { return res.status(500).json(err); });
    });
};
exports.VerifyUserHandler = function (req, res) {
    var token = req.params.token;
    user_model_1.User.findOneAndUpdate({ token: token }, { $set: { verified: true } }, { new: true })
        .then(function (user) {
        if (!user)
            throw new Error('An error occurred.');
        return res.redirect('/verified');
    })
        .catch(function () { return res.status(500).send('An error occurred.'); });
};
exports.DeclineUserHandler = function (req, res) {
    var token = req.params.token;
    user_model_1.User.findOneAndRemove({ token: token })
        .then(function () { return res.send('<script>window.close()</script>'); })
        .catch(function () { return res.status(500).send('An error occurred.'); });
};
/**
 * Updates the user's name
 * @param req
 * @param res
 */
exports.UpdateUserName = function (req, res) {
    if (!req.user.id)
        res.status(500).json({ success: false, error: true, message: 'No id' });
    else {
        user_model_1.User.findById(req.user.id)
            .then(function (user) {
            user.name = req.body.name;
            user.save()
                .then(function () { return res.json({ success: true }); })
                .catch(function (err) { return res.json({ success: false, error: true, message: err }); });
        })
            .catch(function () { return res.status(500).send('An error occurred.'); });
    }
};
exports.UpdateUserEmail = function (req, res) {
    if (!req.user.id)
        res.status(500).json({ success: false, error: true, message: 'No id' });
    else {
        if (validateEmail(req.body.email)) {
            console.log(req.body.email);
            verifyUniqueEmail(req.body.email).then(function (unique) {
                if (unique) {
                    user_model_1.User.findById(req.user.id)
                        .then(function (user) {
                        user.email = req.body.email;
                        user.save()
                            .then(function () { return res.json({ success: true }); })
                            .catch(function (err) { return res.json({ success: false, error: true, message: err }); });
                    });
                }
            });
        }
    }
};
exports.PasswordEmailHandler = function (req, res) {
    if (!req.body.email) {
        return res.status(500).json({ error: true });
    }
    var token = shortid_1.generate();
    user_model_1.User.findOneAndUpdate({ email: req.body.email }, { $set: { token: token } })
        .then(function (user) {
        res.json({ success: true });
        if (user) {
            email_1.sendPasswordResetEmail(req.body.email, token);
        }
    })
        .catch(function (err) { return res.status(500).json({ error: true }); });
};
exports.UpdatePasswordHandler = function (req, res) {
    if (!(req.user || {}).id) {
        return res.status(401).json({ error: true });
    }
    bcrypt.hash(req.body.password, 10)
        .then(function (hash) {
        return user_model_1.User.findByIdAndUpdate(req.user.id, { $set: { password: hash } });
    })
        .then(function () { return res.json({ success: true }); })
        .catch(function (err) { return res.json({ error: true, message: err.message }); });
};
exports.ResetPasswordHandler = function (req, res) {
    if (!req.body.password || !req.body.token) {
        return res.status(500).json({ error: true });
    }
    bcrypt.hash(req.body.password, 10)
        .then(function (hash) { return user_model_1.User.findOneAndUpdate({ token: req.body.token }, { $set: { password: hash }, $unset: { token: 1 } }); })
        .then(function () { return res.json({ success: true }); })
        .catch(function (err) { return res.json({ error: true, message: err.message }); });
};
// Return list of users
exports.GetUsers = function (req, res) {
    user_model_1.User.find({}).then(function (users) { return res.json(users); }).catch(function (err) { return res.status(500).send(err); });
};
/**
 * Verify that the email and password of a user's info is not empty
 * @param info the user info ( email, password, etc. )
 */
function verifySignupInformation(info) {
    return validateEmail(info.email) && utils_1.isValidSting(info.password);
}
/**
 * Check that someone else in the database doesn't have the same email
 * @param email a user's email
 */
function verifyUniqueEmail(email) {
    return user_model_1.User.find({ email: email.toLowerCase() })
        .then(function (users) { return users.length <= 0; })
        .catch(function () { return false; });
}
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function stringContainsProfanity(string) {
    return identifyProfanity(string).length > 0;
}
