import * as passport from 'passport';
import { Strategy } from 'passport-local';
import { ensureLoggedIn } from 'connect-ensure-login';

import { User, UserModel } from '../models/user.model';

export var authentication = passport;

authentication.use(new Strategy((username, password, done) => {
    User.findOne({ username: username })
        .then(user => {
            if (!user) return done(null, false);
            else {
                user.verifyPassword(password, (err:any, isMatch:boolean) => {
                    if (err) return done(err);
                    else if (!isMatch) return done(null, false);
                    else {
                        user.last_login = new Date();
                        user.save();
                        return done(null, { ...user, id: user._id });
                    }
                })
            }
        }).catch((err: any) => {
            console.error(err);
        });
}));

authentication.serializeUser((user:any, callback) => {
    return callback(null, user.id);
});

authentication.deserializeUser((id, callback) => {
    User.findOne({ _id: id })
        .then((user:any) => callback(null, user))
        .catch(err => callback(err))
});
