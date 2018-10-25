"use strict";
/*
    Copied and changed from here:
    https://github.com/jaredhanson/connect-ensure-login/blob/master/lib/ensureLoggedIn.js
 */
Object.defineProperty(exports, "__esModule", { value: true });
function ensureLoggedIn(req, res, next) {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
        return res.status(401).json({ success: false, error: true, message: 'Please login.' });
    }
    next();
}
exports.ensureLoggedIn = ensureLoggedIn;
function ensureAdmin(req, res, next) {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
        return res.status(401).json({ success: false, error: true, message: 'Please login.' });
    }
    else if (!req.user || !req.user.admin) {
        return res.status(401).json({ success: false, error: true, message: 'Unauthorized.' });
    }
    next();
}
exports.ensureAdmin = ensureAdmin;
