import { Strategy } from 'passport-google-oauth20';
import { User } from '../models';

export const GoogleAuth = new Strategy({
    clientID: '255201340078-cedvii5bjtgmde1ofh8u6pfvfmms0k6m.apps.googleusercontent.com',
    clientSecret: 'gzIWvq_pNG2fim8K-2qvXNz0',
    callbackURL: 'http://localhost:4200/api/auth/google/callback'
}, (accessToken, refreshToken, profile, callback) => {
   User.findOne({ 'google.id' : profile.id })
        .then(user => {
            if (!user) {
                const user = new User();
                user.google = {
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

