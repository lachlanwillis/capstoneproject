import { Strategy } from 'passport-facebook';
import { User } from '../models';

export const FacebookAuth = new Strategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: 'http://localhost:4200/api/auth/facebook/callback'
}, (accessToken, refreshToken, profile, callback) => {
    User.findOne({ 'facebook.id' : profile.id })
        .then(user => {
            if (!user) {
                const user = new User();
                user.facebook = {
                    id: profile.id,
                    token: accessToken,
                    name: profile.displayName,
                    email: (profile.emails) ? (profile.emails[0]) ? profile.emails[0].value : '' : ''
                };
                return user.save()
                    .then(() => user);
            } else {
                return user;
            }
        })
        .then(user => callback(null, user))
        .catch(err => {

        })
});