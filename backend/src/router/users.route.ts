import { Request, Response, RequestHandler } from 'express';
import * as identifyProfanity from 'fuhk';
import { UserInfo, User } from '../models/user.model';
import { authentication } from '../authentication';
import { isValidSting } from '../utils';
import { ensureLoggedIn } from '../middleware/ensureLogin';

import * as bcrypt from 'bcrypt';

/**
 * The handler that manages user sign ups. Creates an entry in the database for a user and
 * and stores information like email and hashed password. 
 */
export const HandleUserSignup: RequestHandler = (req: Request, res: Response) => {
   if (!verifySignupInformation(
       { 
           username: req.body.username, 
           password: req.body.password 
        }
    )) res.status(400).json({ error: true, success: false, message: 'information is invalid'}); 
    else if (stringContainsProfanity(req.body.username))
        res.json({ error: true, success: false, message: 'That username does not meet our guidelines' });
    else {
        verifyUniqueUsername(req.body.username)
            .then(unique => {
                if (unique) {
                    bcrypt.hash(req.body.password, 10)
                        .then(hash => {
                            (new User({
                                username: req.body.username,
                                password: hash
                            })).save()
                            .then(user => res.json({ success: true }))
                            .catch(err => res.json({
                                error: true,
                                success: false,
                                message: 'an unexpected error occurred',
                                errorDump: err
                            }));
                        })

                } else res.status(400).json({ success: false, error: true, message: 'username is taken' });
            });
    }
}

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

/**
 * Verify that the username and password of a user's info is not empty
 * @param info the user info ( username, password, etc. )
 */
function verifySignupInformation(info: UserInfo): boolean {
    return isValidSting(info.username) && isValidSting(info.password); 
}

/**
 * Check that someone else in the database doesn't have the same username 
 * @param username a user's username
 */
function verifyUniqueUsername(username: string): Promise<boolean> {
    return User.find({ username: username })
        .then(users => users.length <= 0)
        .catch(() => false);
}

function stringContainsProfanity(string: string): boolean {
    return identifyProfanity(string).length > 0;
}