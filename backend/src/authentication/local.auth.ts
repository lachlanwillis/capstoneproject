import { Strategy } from 'passport-local';
import { User } from '../models/user.model';

export const LocalAuth = new Strategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email })
        .then(user => {
            console.log('us', user);
            console.log(password)
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
});
