import { Strategy } from 'passport-facebook';
import { User } from '../models';

export const FacebookAuth = new Strategy({
    clientID: '653263221696248',
    clientSecret: '98ac9c74c4364870437422ac17646284',
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
                user.verified = true;
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