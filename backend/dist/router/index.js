"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var multer = require("multer");
var images_route_1 = require("./images.route");
// This is just a work in progress. We need to decide where we will be
// storing all the image files that get uploaded.
var upload = multer({ dest: 'tmp/' });
exports.Router = express_1.Router();
exports.Router.post('/api/upload-image', upload.single('image'), images_route_1.UploadImageHandler);
