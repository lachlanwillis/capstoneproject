import * as passport from 'passport';
import { LocalAuth } from './local.auth';
import { FacebookAuth } from './facebook.auth';
import{ GoogleAuth } from './google.auth';
import { User } from '../models/user.model';

export var authentication = passport;

authentication.use(LocalAuth);
authentication.use(FacebookAuth);
authentication.use(GoogleAuth);

authentication.serializeUser((user:any, callback) => {
    return callback(null, user.id);
});

authentication.deserializeUser((id, callback) => {
    User.findOne({ _id: id })
        .then((user:any) => callback(null, user))
        .catch(err => callback(err))
});
