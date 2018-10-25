"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("../models");
exports.GetLeaderboardHandler = function (req, res) {
    var search = {
        'deleted': { $ne: true },
        'points': { $gt: 0 }
    };
    if (req.params.location && req.params.location !== 'all') {
        if (isQueryState(req.params.location)) {
            search = __assign({}, postCodeQueryFromState(req.params.location), search);
        }
        else if (!isNaN(req.params.location)) {
            search['postcode'] = Number(req.params.location);
        }
    }
    console.log(search);
    models_1.User.find(__assign({}, search, { 'leaderboardVisible': { $ne: false } }), ['google', 'facebook', 'points', 'email', 'name'], {
        limit: Number(req.params.limit) || 20,
        sort: {
            points: -1
        }
    })
        .then(function (users) {
        res.json((users || []).map(function (_a) {
            var google = _a.google, facebook = _a.facebook, points = _a.points, email = _a.email, name = _a.name;
            return ({
                points: points,
                name: name || (email ? email.split('@')[0] : undefined) || (google ? google.name : '') || (facebook ? facebook.name : '')
            });
        }));
    })
        .catch(function (err) {
        console.log(err);
        res.status(500).json(err);
    });
};
function isQueryState(state) {
    switch (state.toUpperCase()) {
        case 'TAS':
        case 'SA':
        case 'WA':
        case 'VIC':
        case 'QLD':
        case 'NSW':
        case 'ACT':
        case 'NT':
            return true;
        default:
            return false;
    }
}
function postCodeQueryFromState(state) {
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
            };
        default:
            return {};
    }
}
