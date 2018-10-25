"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var session = require("express-session");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var mongoose_1 = require("mongoose");
var router_1 = require("./router");
var authentication_1 = require("./authentication");
var detector_1 = require("./detector");
// Connect to the database. This shouldn't be here. 
// In future when we deploy we should get rid of this,
// but it just makes things so much easier.
mongoose_1.connect('mongodb://localhost/rubbish');
exports.app = express();
exports.detector = detector_1.detectorGenerator();
exports.app.use(morgan('tiny'));
exports.app.use(bodyParser.json());
exports.app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
exports.app.use(authentication_1.authentication.initialize());
exports.app.use(authentication_1.authentication.session());
exports.app.use(router_1.Router);
exports.app.use('/assets', express.static(path.join(__dirname, '..', 'assets')));
exports.app.use('/', express.static(path.join(__dirname, '..', 'assets')));
exports.app.get('/*', function (req, res) { return res.sendFile(path.join(__dirname, '..', 'assets', 'index.html')); });
