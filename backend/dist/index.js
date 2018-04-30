"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var mongoose_1 = require("mongoose");
var router_1 = require("./router");
// Connect to the database. This shouldn't be here. 
// In future when we deploy we should get rid of this,
// but it just makes things so much easier.
mongoose_1.connect('mongodb://localhost/myapp');
exports.app = express();
exports.app.use(bodyParser.json());
exports.app.use(router_1.Router);
exports.app.get('/*', function (req, res) { return res.send('Hey!'); });
