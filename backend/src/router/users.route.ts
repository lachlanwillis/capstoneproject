import { Request, Response, RequestHandler } from 'express';
import * as identifyProfanity from 'fuhk';
import { UserInfo, User } from '../models/user.model';
import { isValidSting } from '../utils';
import { sendVerificationEmail } from '../utils/email';
import { generate } from 'shortid';
import * as bcrypt from 'bcrypt';

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
    )) res.status(400).json({ error: true, success: false, message: 'information is invalid'}); 
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
}

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