import { RequestHandler } from 'express';
import { User } from '../models';
import { IsUserAdmin } from './users.route';

export const GetLeaderboardHandler: RequestHandler = (req, res) => {
  User.find(
        { 
            'points': { $gt: 0 }, 
            'deleted': { $ne: true }
        },
        null,
        { 
            limit: req.query.limit || 20, 
            sort: {
                points: -1
            }
        }
    ) 
    .then(users => {
        res.json((users || []).map(({ google, facebook, points, _id, username }) => ({
            points,
            _id,
            name: username || (google ? google.name : '') || (facebook ? facebook.name : '')
        })));
    })
    .catch(err => res.status(500).json(err));
};