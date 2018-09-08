import { Request, Response, RequestHandler } from 'express';
import * as identifyProfanity from 'fuhk';
import { UserInfo, User } from '../models/user.model';
import { isValidSting } from '../utils';
import { sendVerificationEmail, sendPasswordResetEmail } from '../utils/email';
import { generate } from 'shortid';
import * as bcrypt from 'bcrypt';
import * as request from 'request';


const GMAPS_API = 'AIzaSyCOgRBeLRUAUeFdd3tgHMSmOm0k_m9V8fk';

/**
 * The handler that manages user sign ups. Creates an entry in the database for a user and
 * and stores information like email and hashed password. 
 */
export const HandleUserSignup: RequestHandler = (req: Request, res: Response) => {
   if (!verifySignupInformation(
       { 
           email: req.body.email, 
           password: req.body.password 
        }
    )) res.status(400).json({ error: true, success: false, message: 'Information is invalid'}); 
    else if (stringContainsProfanity(req.body.email))
        res.json({ error: true, success: false, message: 'That email does not meet our guidelines' });
    else {
        verifyUniqueEmail(req.body.email)
            .then(unique => {
                if (unique) {
                    bcrypt.hash(req.body.password, 10)
                        .then(hash => {
                            const token = generate();
                            (new User({
                                email: req.body.email.toLowerCase(),
                                name: req.body.email.split('@')[0],
                                password: hash,
                                token
                            })).save()
                            .then(() => {
                                res.json({ success: true });
                                sendVerificationEmail(req.body.email, token);
                            })
                            .catch(err => res.json({
                                error: true,
                                success: false,
                                message: 'An unexpected error occurred',
                                errorDump: err
                            }));
                        })

                } else res.status(400).json({ success: false, error: true, message: 'Email is taken' });
            });
    }
}

export const HandleUserLogin: RequestHandler = (req, res) => {
    if (!req.user) {
        res.json({ redirect: '/login' });
    }

    User.findById(req.user.id)
        .then(user => {
            if (user.verified) {
                res.json({ success: true });
            } else {
                req.logout();
                res.json({ redirect: '/verify' });
            }
        })
        .catch(() => {
            req.logout();
            res.json({ redirect: '/login' });
        });
};

/**
 * The hander for users loging out. 
 */
export const HandleUserLogout: RequestHandler = (req: Request, res: Response) => {
    req.logout();
    res.json({ succes: true, error: false, message: 'You have been successfully logged out.' });
}

/**
 * The handler for checking whether a user is an admin or not 
 */
export const IsUserAdmin: RequestHandler = (req: Request, res: Response) => {
    if (!(!req.isAuthenticated || !req.isAuthenticated()) && req.user.admin)
        res.json({ success: true });
    else res.json({ success: false });
}

/**
 * The handler for promoting a user to admin 
 */
export const PromoteUser: RequestHandler = (req: Request, res: Response) => {
    if (!req.body.id) res.status(500).json({ success: false, error: true, message: 'No id' });
    else
        User.findById(req.body.id)
            .then(user => {
                user.admin = true;
                user.save()
                    .then(() => res.json({ success: true }))
                    .catch(err => res.json({ success: false, error: true, message: err }));
            })
            .catch(err => res.json({ success: false, error: true, message: err }));
}

/**
 * Handler for demoting a user. Takes an id of a user from the body. 
 */
export const DemoteUser: RequestHandler = (req: Request, res: Response) => {
    if (!req.body.id) res.status(500).json({ success: false, error: true, message: 'No id' });
    else
        User.findById(req.body.id)
            .then(user => {
                user.admin = false;
                user.save()
                    .then(() => res.json({ success: true }))
                    .catch(err => res.status(500).json({ success: false, error: true, message: err }));
            })
            .catch(err => res.status(500).json({ success: false, error: true, message: err }));
};

/**
 * Handler for opting a user out of the leaderboard 
 * @param req
 * @param res
 */

export const OptOutLeaderboard: RequestHandler = (req: Request, res: Response) => {
    if (!req.user.id) res.status(500).json({ success: false, error: true, message: 'No id' });
    else {
        User.findById(req.user.id)
            .then(user => {
                user.leaderboardVisible = false;
                user.save()
                    .then(() => res.json({ success: true }))
                    .catch(err => res.json({ success: false, error: true, message: err }))
            });
    }
}

/**
 * Handler for opting a user back into the leaderboard 
 * @param req
 * @param res
 */

export const OptInLeaderboard: RequestHandler = (req: Request, res: Response) => {
    if (!req.user.id) res.status(500).json({ success: false, error: true, message: 'No id' });
    else {
        User.findById(req.user.id)
            .then(user => {
                user.leaderboardVisible = true;
                user.save()
                    .then(() => res.json({ success: true }))
                    .catch(err => res.json({ success: false, error: true, message: err }))
            });
    }
}

export const DeleteUserHandler: RequestHandler = (req, res) => {

    console.log(req.body);

    if (!req.body.id) {
        return res.status(500).json({ error: true, message: 'Invalid request' });
    }

    User.findByIdAndRemove(req.body.id)
        .then(() => res.json({ success: true }))
        .catch(e => res.status(500).json({ error: true, message: e.message }));

};

export const GetUsersHandler: RequestHandler = (req, res) => {
    User.find({}, null, { sort: '-last_login' })
        .then(users => res.json({ success: true, users }))
        .catch(e => res.status(500).json({ error: true, message: e.message }));
};


export const SetPostcodeHandler: RequestHandler = (req, res) => {
    if (!req.body.lat || !req.body.long || isNaN(Number(req.body.lat)) || isNaN(Number(req.body.long))) {
        return res.status(500).json({ message: 'Malformed request.' });
    }

    request
        .get({
            url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${req.body.lat},${req.body.long}&location_type=ROOFTOP&result_type=street_address&key=${GMAPS_API}`,
            json: true
        },
        (err, response, body) => {
            if (err) {
                return res.status(500).json({ error: true, message: err });
            }

            const { results } = body;

            if (!results[0] || !results[0].address_components || results[0].address_components.length <= 0) {
                return res.status(500).json({ error: true, message: 'Malformed response.' })
            }

            const components = results[0].address_components;
            const postcode = components.reduce((acc, a) => {
                if (a.types.includes('postal_code')) {
                    return acc || a.short_name
                }
            }, undefined); 

            if (!postcode) return res.json({ success: false, message: 'No postcode found.'});

            User.findByIdAndUpdate(req.user.id, { $set: { postcode }})
                .then(() => res.json({ succes: true, postcode }))
                .catch(err => res.status(500).json(err));
        });
};

export const VerifyUserHandler: RequestHandler = (req, res) => {
    const { token } = req.params;

    User.findOneAndUpdate({ token }, { $set: { verified: true } }, { new: true })
        .then(user => {
            if (!user) throw new Error('An error occurred.');
            return res.redirect('/verified');
        })
        .catch(() => res.status(500).send('An error occurred.'));
};

export const DeclineUserHandler: RequestHandler = (req, res) => {
    const { token } = req.params;
    User.findOneAndRemove({ token })
        .then(() => res.send('<script>window.close()</script>')) 
        .catch(() => res.status(500).send('An error occurred.'));
};



/**
 * Updates the user's name
 * @param req
 * @param res
 */
export const UpdateUserName: RequestHandler = (req, res) => {
    if (!req.user.id) res.status(500).json({ success: false, error: true, message: 'No id' });
    else {
        User.findById(req.user.id)
            .then(user => {
                
                user.name = req.body.name;
                user.save()
                    .then(() => res.json({ success: true }))
                    .catch(err => res.json({ success: false, error: true, message: err }))
            })
            .catch(() => res.status(500).send('An error occurred.'));
    }
}




export const UpdateUserEmail: RequestHandler = (req, res) => {
    if (!req.user.id) res.status(500).json({ success: false, error: true, message: 'No id' });
    else {
        if (validateEmail(req.body.email)) {
            console.log(req.body.email);
            verifyUniqueEmail(req.body.email).then(unique => {
                if (unique) {
                    User.findById(req.user.id)
                        .then(user => {
                            user.email = req.body.email;
                            user.save()
                                .then(() => res.json({ success: true }))
                                .catch(err => res.json({ success: false, error: true, message: err }))
                        });
                }
            })

        }
        
    }
}



export const PasswordEmailHandler: RequestHandler = (req, res) => {
    if (!req.body.email) {
        return res.status(500).json({ error: true });
    }
    const token = generate();
    User.findOneAndUpdate({ email: req.body.email }, { $set: { token }})
        .then(user => {
            res.json({ success: true });
            if (user) {
                sendPasswordResetEmail(req.body.email, token);
            }
        })
        .catch(err => res.status(500).json({ error: true }));
};

export const ResetPasswordHandler: RequestHandler = (req, res) => {
    if (!req.body.password || !req.body.token) {
        return res.status(500).json({ error: true });
    }

    bcrypt.hash(req.body.password, 10)
        .then(hash => User.findOneAndUpdate(
            { token: req.body.token }, 
            { $set: { password: hash }, $unset: { token: 1 }}
        ))
        .then(() => res.json({ success: true }))
        .catch(err => res.json({ error: true, message: err.message }));

};


/**
 * Verify that the email and password of a user's info is not empty
 * @param info the user info ( email, password, etc. )
 */
function verifySignupInformation(info: Partial<UserInfo>): boolean {
    return validateEmail(info.email) && isValidSting(info.password); 
}

/**
 * Check that someone else in the database doesn't have the same email 
 * @param email a user's email
 */
function verifyUniqueEmail(email: string): Promise<boolean> {
    return User.find({ email: email.toLowerCase() })
        .then(users => users.length <= 0)
        .catch(() => false);
}

function validateEmail(email): boolean {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function stringContainsProfanity(string: string): boolean {
    return identifyProfanity(string).length > 0;
}