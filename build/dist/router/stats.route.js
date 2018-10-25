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
exports.RubbishDistributionHandler = function (req, res) {
    models_1.Image.find({})
        .then(function (images) { return images.map(function (x) { return x.detections; }); })
        .then(function (detections) { return detections.reduce(function (acc, a) { return acc.concat(a); }, []); })
        .then(function (detections) {
        return detections.reduce(function (acc, a) {
            return (__assign({}, acc, (_a = {}, _a[a.name] = acc[a.name] ? acc[a.name] + 1 : 1, _a)));
            var _a;
        }, {});
    })
        .then(function (result) { return res.json(result); })
        .catch(function (err) { return res.status(500).json({ error: true, message: err.message }); });
};
exports.ContributersStats = function (req, res) {
    models_1.User.find({})
        .then(function (users) { return res.json({ users: users.length }); })
        .catch(function (e) { return res.status(500).json({ error: true, message: e.message }); });
};
