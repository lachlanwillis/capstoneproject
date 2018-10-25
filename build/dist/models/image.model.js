"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.ImageSchema = new mongoose_1.Schema({
    title: String,
    location: String,
    description: String,
    encoding: String,
    mimetype: String,
    size: Number,
    fileName: String,
    userId: String,
    place: String,
    name: String,
    detections: [
        {
            name: String,
            prob: Number,
            box: {
                x: Number,
                y: Number,
                w: Number,
                h: Number
            }
        }
    ],
    deleted: { type: Boolean, default: false },
    rubbishVisibility: { type: Boolean, default: false }
});
exports.Image = mongoose_1.model("Image", exports.ImageSchema);
