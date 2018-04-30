"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.ImageSchema = new mongoose_1.Schema({
    title: String,
    location: String,
    description: String,
    encoding: String,
    mimetype: String,
    size: Number
});
exports.Image = mongoose_1.model("Image", exports.ImageSchema);
