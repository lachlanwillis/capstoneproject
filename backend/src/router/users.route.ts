import { Request, Response, RequestHandler } from 'express';
import { UserInfo, User } from '../models/user.model';
import { authentication } from '../authentication';
import { isValidSting } from '../utils';
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

export const HandleUserLogout: RequestHandler = (req: Request, res: Response) => {
    req.logout();
    res.redirect('/login');
}

function verifySignupInformation(info: UserInfo): boolean {
    return isValidSting(info.username) && isValidSting(info.password); 
}

function verifyUniqueUsername(username: string): Promise<boolean> {
    return User.find({ username: username })
        .then(users => users.length <= 0)
        .catch(() => false);
}