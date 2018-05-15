/*
	Copied and changed from here:
	https://github.com/jaredhanson/connect-ensure-login/blob/master/lib/ensureLoggedIn.js
 */

export function ensureLoggedIn(req, res, next) {
	if (!req.isAuthenticated || !req.isAuthenticated()) {
      return res.send("401: Please log in.");
    }
    next();
}