import { RequestHandler } from 'express';
import { User } from '../models/user.model';

export const DeclineEmailHandler: RequestHandler = (req, res) => {

};

export const VerifyEmailHandler: RequestHandler = (req, res) => {
    if (!req.params.token) {
        res.redirect('/');
    }

    User.findOne({ token: req.params.token })
        .then(user => {
            if (!user) {
                return res.status(500).send('An unexpected error occurred.')
            }
        })
        .catch(err => res.status(500).json(err))
};