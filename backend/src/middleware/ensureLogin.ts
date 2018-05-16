/*
	Copied and changed from here:
	https://github.com/jaredhanson/connect-ensure-login/blob/master/lib/ensureLoggedIn.js
 */

export function ensureLoggedIn(req, res, next) {
	if (!req.isAuthenticated || !req.isAuthenticated()) {
      return res.status(401).json({ success: false, error: true, message: 'Please login.'});
    }
    next();
}

export function ensureAdmin(req, res, next) { 
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(401).json({ success: false, error: true, message: 'Please login.' });
  } else if (!req.user || !req.user.admin) {
    return res.status(401).json({ success: false, error: true, message: 'Unauthorized.'})
  }
}