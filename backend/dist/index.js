"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
exports.app = express();
exports.app.get('/hey', function (req, res) { return res.send('Hey!!'); });
exports.app.get('/*', function (req, res) { return res.send('Hey!'); });
