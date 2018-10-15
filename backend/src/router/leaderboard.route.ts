import { RequestHandler } from 'express';
import { User } from '../models';

export const GetLeaderboardHandler: RequestHandler = (req, res) => {

    let search = {
        'deleted': { $ne: true },
        'points': { $gt: 0 }
    }

    if (req.params.location && req.params.location !== 'all') {
        if (isQueryState(req.params.location)) {
            search = {
                ...search,
                ...postCodeQueryFromState(req.params.location)
            }
        } else {
            search['postcode'] = Number(req.params.location);
        }
    }

    User.find(
        {
            ...search,
            'leaderboardVisible': { $ne: false }
        },
        
        ['google', 'facebook', 'points', 'email'],
        { 
            
            limit: Number(req.params.limit) || 20, 
            sort: {
                points: -1
            }
        }
    ) 
    .then(users => {
        res.json((users || []).map(({ google, facebook, points, email, name }) => ({
            points,
            name: name || email.split('@')[0] || (google ? google.name : '') || (facebook ? facebook.name : '')
        })));
    })
    .catch(err => res.status(500).json(err));
};

function isQueryState(state: string): boolean {
    switch (state.toUpperCase()) {
        case 'NSW':
        case 'TAS':
        case 'SA':
        case 'WA':
        case 'VIC':
        case 'QLD':
        case 'ACT':
        case 'NT':
        return true;
        default:
        return false;
    }
}

function postCodeQueryFromState(state: string): any {
    switch (state.toUpperCase()) {
        case 'NSW':
        return {
            $or: [
                { 
                    $and: [
                        {
                            postcode: { $gte: 1000 }
                        },
                        {
                            postcode: { $lte: 2599 }
                        }
                    ]
                },
                { 
                    $and: [
                        {
                            postcode: { $gte: 2620 }
                        },
                        {
                            postcode: { $lte: 2899 }
                        }
                    ]
                },
                { 
                    $and: [
                        {
                            postcode: { $gte: 2921 }
                        },
                        {
                            postcode: { $lte: 2999 }
                        }
                    ]
                }
            ]
        };
        case 'QLD':
        return {
            $or: [
                { 
                    $and: [
                        {
                            postcode: { $gte: 4000 }
                        },
                        {
                            postcode: { $lte: 4999 }
                        }
                    ]
                },
                { 
                    $and: [
                        {
                            postcode: { $gte: 9000 }
                        },
                        {
                            postcode: { $lte: 9999 }
                        }
                    ]
                }
            ]
        };
        case 'VIC':
        return {
            $or: [
                { 
                    $and: [
                        {
                            postcode: { $gte: 3000 }
                        },
                        {
                            postcode: { $lte: 3999 }
                        }
                    ]
                },
                { 
                    $and: [
                        {
                            postcode: { $gte: 8000 }
                        },
                        {
                            postcode: { $lte: 8999 }
                        }
                    ]
                }
            ]
        };
        case 'SA':
        return {
            $and: [
                {
                    postcode: { $gte: 5000 }
                },
                {
                    postcode: { $lte: 5999 }
                }
            ]
        };
        case 'ACT':
        return {
            $or: [
                { 
                    $and: [
                        {
                            postcode: { $gte: 200 }
                        },
                        {
                            postcode: { $lte: 299 }
                        }
                    ]
                },
                { 
                    $and: [
                        {
                            postcode: { $gte: 2600 }
                        },
                        {
                            postcode: { $lte: 2899 }
                        }
                    ]
                },
                { 
                    $and: [
                        {
                            postcode: { $gte: 2900 }
                        },
                        {
                            postcode: { $lte: 2920 }
                        }
                    ]
                }
            ]
        };
        case 'TAS':
        return {
            $and: [
                {
                    postcode: { $gte: 7000 }
                },
                {
                    postcode: { $lte: 7999 }
                }
            ]
        };
        case 'WA':
        return {
            $and: [
                {
                    postcode: { $gte: 6000 }
                },
                {
                    postcode: { $lte: 6999 }
                }
            ]
        };
        case 'NT':
        return {
            $and: [
                {
                    postcode: { $gte: 800 }
                },
                {
                    postcode: { $lte: 999 }
                }
            ]
        }
        default: 
        return {};
    }
}